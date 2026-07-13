/* AUTO-GENERATED from tokens/typography.json — do not edit by hand. */
import type { CSSProperties } from 'react';

export const FontFamilyBase = "Geist, ui-sans-serif, system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";

export const Typography = {
  Display: { fontFamily: FontFamilyBase, fontWeight: 700, fontSize: 36, lineHeight: 1.15 },
  HeadingH1: { fontFamily: FontFamilyBase, fontWeight: 600, fontSize: 30, lineHeight: 1.2 },
  HeadingH2: { fontFamily: FontFamilyBase, fontWeight: 600, fontSize: 24, lineHeight: 1.25 },
  HeadingH3: { fontFamily: FontFamilyBase, fontWeight: 600, fontSize: 20, lineHeight: 1.3 },
  HeadingH4: { fontFamily: FontFamilyBase, fontWeight: 600, fontSize: 16, lineHeight: 1.35 },
  HeadingH5: { fontFamily: FontFamilyBase, fontWeight: 600, fontSize: 14, lineHeight: 1.4 },
  BodyLarge: { fontFamily: FontFamilyBase, fontWeight: 400, fontSize: 18, lineHeight: 1.5 },
  BodyDefault: { fontFamily: FontFamilyBase, fontWeight: 400, fontSize: 16, lineHeight: 1.5 },
  BodySmall: { fontFamily: FontFamilyBase, fontWeight: 400, fontSize: 14, lineHeight: 1.5 },
  Label: { fontFamily: FontFamilyBase, fontWeight: 500, fontSize: 14, lineHeight: 1.4 },
  LabelLarge: { fontFamily: FontFamilyBase, fontWeight: 500, fontSize: 16, lineHeight: 1.4 },
  LabelXl: { fontFamily: FontFamilyBase, fontWeight: 500, fontSize: 18, lineHeight: 1.4 },
  Caption: { fontFamily: FontFamilyBase, fontWeight: 400, fontSize: 12, lineHeight: 1.4 },
  ExtraSmall: { fontFamily: FontFamilyBase, fontWeight: 500, fontSize: 9, lineHeight: 1.4 },
  StrongSm: { fontFamily: FontFamilyBase, fontWeight: 700, fontSize: 12, lineHeight: 1.2 },
  StrongMd: { fontFamily: FontFamilyBase, fontWeight: 700, fontSize: 14, lineHeight: 1.2 },
  StrongLg: { fontFamily: FontFamilyBase, fontWeight: 700, fontSize: 20, lineHeight: 1.2 },
} satisfies Record<string, CSSProperties>;

export type TypographyStyle = keyof typeof Typography;
