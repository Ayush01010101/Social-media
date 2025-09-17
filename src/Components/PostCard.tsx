import type React from "react"
import type { ReactNode } from "react"
interface Props {
  title: string;
  id: number;
  content: string;

}
const PostCard: React.FC<Props> = ({ title, content }): ReactNode => {
  return (
    <div className="border border-white">

      <div className="text-white">
        {title}
        <br />

        {content}

      </div>
    </div>

  )
}

export default PostCard
