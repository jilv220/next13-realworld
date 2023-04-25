import { Badge } from "@/components/ui/badge"

export async function Tags() {
  const tags = await fetch("https://api.realworld.io/api/tags")
  const tagsData = await tags.json()
  return tagsData.tags.map((tag: string) => <Badge> {tag} </Badge>)
}
