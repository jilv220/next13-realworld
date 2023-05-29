import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar'

interface AvatarWrapperProps {
  image: string | undefined
}

export default function AvatarWrapper({ image }: AvatarWrapperProps) {
  return (
    <Avatar className='h-[32px] w-[32px]'>
      <AvatarImage
        className='rounded-full'
        src={image}
        alt='author image'
        width={32}
        height={32}
      />
      <AvatarFallback>AI</AvatarFallback>
    </Avatar>
  )
}
