export default function SectionHeader({ command, title }) {
  return (
    <div className="flex flex-col gap-2 mb-8">
      <div className="terminal-prompt">
        <span className="text-primary">jhianne@portfolio</span>
        <span className="text-muted-foreground">~$</span>
        <span className="text-foreground">{command}</span>
      </div>
      <div className="flex items-center gap-4">
        <h2 className="section-title">{title}</h2>
        <div className="divider" />
      </div>
    </div>
  )
}
