// SEO Constants following Clean Architecture - Domain Layer
export const SEO_CONSTANTS = {
  siteName: "Roma Pizza",
  siteDescription: "طلب بيتزا أونلاين من روما بيتزا - توصيل سريع وطازج",
  defaultTitle: "Roma Pizza - بيتزا طازجة مع التوصيل السريع",
  defaultDescription:
    "اطلب بيتزا طازجة من روما بيتزا. توصيل سريع، جودة عالية، وأسعار مناسبة. اختر من بين مجموعة واسعة من البيتزا والمشروبات.",
  keywords: [
    "بيتزا",
    "توصيل بيتزا",
    "روما بيتزا",
    "pizza",
    "pizza delivery",
    "roma pizza",
  ] as string[],
  locale: "ar_SA",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://roma2go.com",
} as const;
