import { describe, it, expect, vi, beforeEach } from "vitest";
import { getPricingData } from "../pricing";
import { getPayload } from "@/lib/payload";

vi.mock("@/lib/payload", () => ({
  getPayload: vi.fn(),
}));

const mockedGetPayload = vi.mocked(getPayload);

function createMockPayload(overrides: Partial<{
  findDocs: Record<string, unknown>[];
  addOnDocs: Record<string, unknown>[];
  siteSettings: Record<string, unknown>;
  serviceArea: Record<string, unknown>;
}> = {}) {
  const {
    findDocs = [],
    addOnDocs = [],
    siteSettings = { depositPercent: 40 },
    serviceArea = { perMileCents: 75, includedRadiusMiles: 30 },
  } = overrides;

  let findCallCount = 0;

  return {
    find: vi.fn().mockImplementation(() => {
      findCallCount++;
      if (findCallCount === 1) return Promise.resolve({ docs: findDocs });
      return Promise.resolve({ docs: addOnDocs });
    }),
    findGlobal: vi.fn().mockImplementation(({ slug }: { slug: string }) => {
      if (slug === "site-settings") return Promise.resolve(siteSettings);
      if (slug === "service-area") return Promise.resolve(serviceArea);
      return Promise.resolve({});
    }),
  };
}

describe("getPricingData", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns the correct shape with packages, addOns, depositPercent, travelPerMileCents, and travelFreeRadiusMiles", async () => {
    const mockPackage = {
      id: "pkg-1",
      name: "Basic Package",
      category: "content_creation",
      priceCents: 50000,
      priceDisplay: "$500",
      isHourly: false,
      features: [{ feature: "5 edited photos" }],
      isFeatured: false,
    };
    const mockAddOn = {
      id: "addon-1",
      name: "Extra Hour",
      appliesTo: "all",
      priceCents: 10000,
      priceDisplay: "$100",
      unit: "per_hour",
    };

    const mockPayload = createMockPayload({
      findDocs: [mockPackage],
      addOnDocs: [mockAddOn],
      siteSettings: { depositPercent: 40 },
      serviceArea: { perMileCents: 75, includedRadiusMiles: 30 },
    });

    mockedGetPayload.mockResolvedValue(mockPayload as unknown as Awaited<ReturnType<typeof getPayload>>);

    const result = await getPricingData();

    expect(result).toEqual({
      packages: [mockPackage],
      addOns: [mockAddOn],
      depositPercent: 40,
      travelPerMileCents: 75,
      travelFreeRadiusMiles: 30,
    });
  });

  it("returns defaults when payload throws an error", async () => {
    mockedGetPayload.mockRejectedValue(new Error("Database connection failed"));

    const result = await getPricingData();

    expect(result).toEqual({
      packages: [],
      addOns: [],
      depositPercent: 50,
      travelPerMileCents: 50,
      travelFreeRadiusMiles: 25,
    });
  });

  it("falls back depositPercent to 50 when site-settings does not include depositPercent", async () => {
    const mockPayload = createMockPayload({
      siteSettings: {},
      serviceArea: { perMileCents: 60, includedRadiusMiles: 20 },
    });

    mockedGetPayload.mockResolvedValue(mockPayload as unknown as Awaited<ReturnType<typeof getPayload>>);

    const result = await getPricingData();

    // When depositPercent is undefined, the ?? 50 fallback triggers
    expect(result.depositPercent).toBe(50);
  });

  it("calls payload.find for packages and add-ons with correct parameters", async () => {
    const mockPayload = createMockPayload();
    mockedGetPayload.mockResolvedValue(mockPayload as unknown as Awaited<ReturnType<typeof getPayload>>);

    await getPricingData();

    expect(mockPayload.find).toHaveBeenCalledTimes(2);
    expect(mockPayload.find).toHaveBeenCalledWith({
      collection: "packages",
      where: { isVisible: { equals: true } },
      sort: "sortOrder",
      limit: 50,
    });
    expect(mockPayload.find).toHaveBeenCalledWith({
      collection: "add-ons",
      where: { isVisible: { equals: true } },
      sort: "sortOrder",
      limit: 50,
    });
  });

  it("calls payload.findGlobal for site-settings and service-area", async () => {
    const mockPayload = createMockPayload();
    mockedGetPayload.mockResolvedValue(mockPayload as unknown as Awaited<ReturnType<typeof getPayload>>);

    await getPricingData();

    expect(mockPayload.findGlobal).toHaveBeenCalledTimes(2);
    expect(mockPayload.findGlobal).toHaveBeenCalledWith({ slug: "site-settings" });
    expect(mockPayload.findGlobal).toHaveBeenCalledWith({ slug: "service-area" });
  });
});
