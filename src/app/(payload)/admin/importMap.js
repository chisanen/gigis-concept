import { MetaDescriptionComponent, MetaImageComponent, MetaTitleComponent, OverviewComponent, PreviewComponent } from '@payloadcms/plugin-seo/client'
import { AlignFeatureClient, BlockquoteFeatureClient, BlocksFeatureClient, BoldFeatureClient, ChecklistFeatureClient, CodeBlockBlockComponent, CodeComponent, DebugJsxConverterFeatureClient, FixedToolbarFeatureClient, HeadingFeatureClient, HorizontalRuleFeatureClient, IndentFeatureClient, InlineCodeFeatureClient, InlineToolbarFeatureClient, ItalicFeatureClient, LexicalPluginToLexicalFeatureClient, LinkFeatureClient, OrderedListFeatureClient, ParagraphFeatureClient, RelationshipFeatureClient, SlateToLexicalFeatureClient, StrikethroughFeatureClient, SubscriptFeatureClient, SuperscriptFeatureClient, TableFeatureClient, TestRecorderFeatureClient, TextStateFeatureClient, TreeViewFeatureClient, UnderlineFeatureClient, UnorderedListFeatureClient, UploadFeatureClient, codeConverterClient } from '@payloadcms/richtext-lexical/client'
import { VercelBlobClientUploadHandler } from '@payloadcms/storage-vercel-blob/client'
import { StudioDashboard } from '@/components/admin/Dashboard'
import { StudioCalendar } from '@/components/admin/Calendar'
import { LeadsCRM } from '@/components/admin/LeadsCRM'
import { StudioReports } from '@/components/admin/Reports'

export const importMap = {
  '@/components/admin/Dashboard#StudioDashboard': StudioDashboard,
  '@/components/admin/Calendar#StudioCalendar': StudioCalendar,
  '@/components/admin/LeadsCRM#LeadsCRM': LeadsCRM,
  '@/components/admin/Reports#StudioReports': StudioReports,
  '@payloadcms/plugin-seo/client#MetaDescriptionComponent': MetaDescriptionComponent,
  '@payloadcms/plugin-seo/client#MetaImageComponent': MetaImageComponent,
  '@payloadcms/plugin-seo/client#MetaTitleComponent': MetaTitleComponent,
  '@payloadcms/plugin-seo/client#OverviewComponent': OverviewComponent,
  '@payloadcms/plugin-seo/client#PreviewComponent': PreviewComponent,
  '@payloadcms/richtext-lexical/client#AlignFeatureClient': AlignFeatureClient,
  '@payloadcms/richtext-lexical/client#BlockquoteFeatureClient': BlockquoteFeatureClient,
  '@payloadcms/richtext-lexical/client#BlocksFeatureClient': BlocksFeatureClient,
  '@payloadcms/richtext-lexical/client#BoldFeatureClient': BoldFeatureClient,
  '@payloadcms/richtext-lexical/client#ChecklistFeatureClient': ChecklistFeatureClient,
  '@payloadcms/richtext-lexical/client#CodeBlockBlockComponent': CodeBlockBlockComponent,
  '@payloadcms/richtext-lexical/client#CodeComponent': CodeComponent,
  '@payloadcms/richtext-lexical/client#DebugJsxConverterFeatureClient': DebugJsxConverterFeatureClient,
  '@payloadcms/richtext-lexical/client#FixedToolbarFeatureClient': FixedToolbarFeatureClient,
  '@payloadcms/richtext-lexical/client#HeadingFeatureClient': HeadingFeatureClient,
  '@payloadcms/richtext-lexical/client#HorizontalRuleFeatureClient': HorizontalRuleFeatureClient,
  '@payloadcms/richtext-lexical/client#IndentFeatureClient': IndentFeatureClient,
  '@payloadcms/richtext-lexical/client#InlineCodeFeatureClient': InlineCodeFeatureClient,
  '@payloadcms/richtext-lexical/client#InlineToolbarFeatureClient': InlineToolbarFeatureClient,
  '@payloadcms/richtext-lexical/client#ItalicFeatureClient': ItalicFeatureClient,
  '@payloadcms/richtext-lexical/client#LexicalPluginToLexicalFeatureClient': LexicalPluginToLexicalFeatureClient,
  '@payloadcms/richtext-lexical/client#LinkFeatureClient': LinkFeatureClient,
  '@payloadcms/richtext-lexical/client#OrderedListFeatureClient': OrderedListFeatureClient,
  '@payloadcms/richtext-lexical/client#ParagraphFeatureClient': ParagraphFeatureClient,
  '@payloadcms/richtext-lexical/client#RelationshipFeatureClient': RelationshipFeatureClient,
  '@payloadcms/richtext-lexical/client#SlateToLexicalFeatureClient': SlateToLexicalFeatureClient,
  '@payloadcms/richtext-lexical/client#StrikethroughFeatureClient': StrikethroughFeatureClient,
  '@payloadcms/richtext-lexical/client#SubscriptFeatureClient': SubscriptFeatureClient,
  '@payloadcms/richtext-lexical/client#SuperscriptFeatureClient': SuperscriptFeatureClient,
  '@payloadcms/richtext-lexical/client#TableFeatureClient': TableFeatureClient,
  '@payloadcms/richtext-lexical/client#TestRecorderFeatureClient': TestRecorderFeatureClient,
  '@payloadcms/richtext-lexical/client#TextStateFeatureClient': TextStateFeatureClient,
  '@payloadcms/richtext-lexical/client#TreeViewFeatureClient': TreeViewFeatureClient,
  '@payloadcms/richtext-lexical/client#UnderlineFeatureClient': UnderlineFeatureClient,
  '@payloadcms/richtext-lexical/client#UnorderedListFeatureClient': UnorderedListFeatureClient,
  '@payloadcms/richtext-lexical/client#UploadFeatureClient': UploadFeatureClient,
  '@payloadcms/richtext-lexical/client#codeConverterClient': codeConverterClient,
  '@payloadcms/storage-vercel-blob/client#VercelBlobClientUploadHandler': VercelBlobClientUploadHandler,
}
