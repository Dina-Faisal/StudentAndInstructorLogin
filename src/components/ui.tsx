import type {
  ButtonHTMLAttributes,
  InputHTMLAttributes,
  ReactNode,
} from 'react'

type ButtonVariant = 'primary' | 'neutral' | 'subtle'

export function Button({
  variant = 'primary',
  size = 'medium',
  iconStart,
  iconEnd,
  className = '',
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: 'medium' | 'small'
  iconStart?: ReactNode
  iconEnd?: ReactNode
}) {
  return (
    <button
      className={`ui-button ui-button-${variant} ${
        size === 'small' ? 'ui-button-small' : ''
      } ${className}`}
      {...props}
    >
      {iconStart}
      {children}
      {iconEnd}
    </button>
  )
}

export function InputField({
  label,
  prefix,
  className = '',
  onChange,
  ...props
}: Omit<InputHTMLAttributes<HTMLInputElement>, 'onChange' | 'prefix'> & {
  label?: string
  prefix?: ReactNode
  onChange?: (value: string) => void
}) {
  return (
    <label className={`flex flex-col gap-xs ${className}`}>
      {label ? (
        <span className="text-label font-medium text-text-primary">{label}</span>
      ) : null}
      <span className="ui-input-shell">
        {prefix}
        <input
          className="ui-input"
          onChange={(event) => onChange?.(event.target.value)}
          {...props}
        />
      </span>
    </label>
  )
}

export function Checkbox({
  label,
  defaultChecked,
  onChange,
}: {
  label: string
  defaultChecked?: boolean
  onChange?: (checked: boolean) => void
}) {
  return (
    <label className="flex items-center gap-md">
      <input
        className="ui-checkbox"
        type="checkbox"
        defaultChecked={defaultChecked}
        onChange={(event) => onChange?.(event.target.checked)}
      />
      <span className="text-label-sm font-medium text-text-primary">
        {label}
      </span>
    </label>
  )
}

export function RadioGroup({
  options,
  value,
  onChange,
  name,
}: {
  options: Array<{ value: string; label: string; description?: string }>
  value?: string
  onChange?: (value: string) => void
  name?: string
}) {
  return (
    <div className="flex flex-col gap-md" role="radiogroup" aria-label={name}>
      {options.map((option) => {
        const active = value === option.value

        return (
          <button
            key={option.value}
            type="button"
            className={`ui-role-option ${
              active ? 'ui-role-option-active' : ''
            }`}
            role="radio"
            aria-checked={active}
            onClick={() => onChange?.(option.value)}
          >
            <span className="ui-radio-dot" aria-hidden="true" />
            <span className="flex flex-col gap-xs">
              <span className="text-label font-medium text-text-primary">
                {option.label}
              </span>
              {option.description ? (
                <span className="text-label-sm text-text-secondary">
                  {option.description}
                </span>
              ) : null}
            </span>
          </button>
        )
      })}
    </div>
  )
}

export function SidebarButton({
  icon,
  active,
  className = '',
  ...props
}: Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'children'> & {
  icon: ReactNode
  active?: boolean
}) {
  return (
    <button
      className={`ui-sidebar-button ${
        active ? 'ui-sidebar-button-active' : ''
      } ${className}`}
      {...props}
    >
      {icon}
    </button>
  )
}

export function SidebarNavigation({
  appName,
  children,
  footer,
}: {
  appName: string
  children?: ReactNode
  footer?: ReactNode
}) {
  return (
    <aside className="app-sidebar flex h-full flex-col items-center border-r border-border-primary bg-surface-bg p-md">
      <div className="flex h-full flex-col items-center gap-md">
        <div
          className="ui-brand-mark mb-xl"
          role="img"
          aria-label={`${appName} logo`}
          title={appName}
        >
          e
        </div>
        {children}
        <div className="mt-auto flex flex-col items-center gap-md">{footer}</div>
      </div>
    </aside>
  )
}

export function Avatar({
  initials = 'U',
  alt,
}: {
  type?: 'initial' | 'image'
  initials?: string
  size?: 'small' | 'medium' | 'large'
  shape?: 'circle' | 'square'
  alt?: string
}) {
  return (
    <div className="ui-avatar" role="img" aria-label={alt}>
      {initials}
    </div>
  )
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  return children
}
