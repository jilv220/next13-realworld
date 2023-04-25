import Link from "next/link"

import { siteConfig } from "@/config/site"
import { fetchData } from "@/lib/fetch"
import { buttonVariants } from "@/components/ui/button"
import { Tags } from "@/components/tags"
import { IArticle } from "@/types/articles"
import { Article } from "@/components/article"

export default async function IndexPage() {
  const queryParams = {
    limit: "10",
    offset: "0",
  }

  const res = await fetchData(
    "https://api.realworld.io/api/articles",
    queryParams
  )
  const articles = res.articles

  return (
    <div className="container sm:flex">
      <section className="items-center gap-6 pb-8 pt-6 md:py-10">
        {articles.map((article: IArticle) => (
          <div className='py-6' key={article.createdAt}>
            <Article article={article}></Article>
          </div>
        ))}
      </section>
      <aside className="pb-8 pt-6 md:py-10">
        {/* @ts-expect-error Server Component */}
        <Tags></Tags>
      </aside>
    </div>
  )
}
