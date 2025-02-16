import { Breadcrumbs } from "@/components/dynamic-breadcrumb";
type Props = {
  params: {
    catchAll: string[]
  }
}
export default function BreadcrumbSlot({params: { catchAll } }: Props) {
  return <Breadcrumbs routes={catchAll} />
}