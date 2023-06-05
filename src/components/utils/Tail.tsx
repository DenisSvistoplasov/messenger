interface ITailProps{
  className?: string;
  fill?: string;
}
export function Tail({ className, fill = 'red'}: ITailProps) {
  return (
    <svg className={className} viewBox='0 0 20 20'>
      <path d="M20 0 a20 20 0 0 1 -20 20l20 0z"/>
    </svg>
  )
}