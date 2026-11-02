import { useEffect, useState } from 'react'
import {
  Avatar,
  Button,
  Checkbox,
  InputField,
  RadioGroup,
  SidebarButton,
  SidebarNavigation,
  ThemeProvider,
} from './components/ui'
import {
  ArrowLeft,
  ArrowRight,
  Book,
  CheckCircle,
  Film,
  Folder,
  Home,
  Lock,
  Mail,
  Settings,
} from 'lucide-react'

type Role = 'student' | 'instructor'
type View = 'login' | 'recovery' | 'success'
type NavSection = 'home' | 'studio' | 'courses' | 'library' | 'settings'

const navLabels: Record<NavSection, string> = {
  home: 'Learning home',
  studio: 'Media studio',
  courses: 'Course spaces',
  library: 'Shared library',
  settings: 'Workspace settings',
}

const roleContent: Record<
  Role,
  { label: string; description: string; welcome: string }
> = {
  student: {
    label: 'Student',
    description: 'Access classes, assignments, and your learning progress.',
    welcome: 'Your classes and assignments are ready.',
  },
  instructor: {
    label: 'Instructor',
    description: 'Manage courses, learners, and teaching resources.',
    welcome: 'Your courses and teaching tools are ready.',
  },
}

function AppShell({
  activeNav,
  onNavChange,
  children,
}: {
  activeNav: NavSection
  onNavChange: (section: NavSection) => void
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen font-sans">
      <div className="hidden md:flex">
        <SidebarNavigation
          appName="eSpace"
          footer={
            <>
              <SidebarButton
                icon={<Settings className="size-full" strokeWidth={1.5} />}
                active={activeNav === 'settings'}
                aria-label={navLabels.settings}
                title={navLabels.settings}
                onClick={() => onNavChange('settings')}
              />
              <Avatar
                type="initial"
                initials="ED"
                size="medium"
                shape="circle"
                alt="Education workspace"
              />
            </>
          }
        >
          <SidebarButton
            icon={<Home className="size-full" strokeWidth={1.5} />}
            active={activeNav === 'home'}
            aria-label={navLabels.home}
            title={navLabels.home}
            onClick={() => onNavChange('home')}
          />
          <SidebarButton
            icon={<Film className="size-full" strokeWidth={1.5} />}
            active={activeNav === 'studio'}
            aria-label={navLabels.studio}
            title={navLabels.studio}
            onClick={() => onNavChange('studio')}
          />
          <SidebarButton
            icon={<Book className="size-full" strokeWidth={1.5} />}
            active={activeNav === 'courses'}
            aria-label={navLabels.courses}
            title={navLabels.courses}
            onClick={() => onNavChange('courses')}
          />
          <SidebarButton
            icon={<Folder className="size-full" strokeWidth={1.5} />}
            active={activeNav === 'library'}
            aria-label={navLabels.library}
            title={navLabels.library}
            onClick={() => onNavChange('library')}
          />
        </SidebarNavigation>
      </div>

      <main className="flex flex-1 items-center justify-center overflow-y-auto bg-brand-tertiary p-2xl">
        <div className="auth-container flex w-full flex-col gap-lg">
          <div
            className="w-fit rounded-corner-full bg-surface-bg px-lg py-sm text-meta font-medium text-text-secondary"
            aria-live="polite"
          >
            eSpace · {navLabels[activeNav]}
          </div>
          {children}
        </div>
      </main>
    </div>
  )
}

function LoginView({
  role,
  setRole,
  email,
  setEmail,
  password,
  setPassword,
  error,
  onSignIn,
  onForgotPassword,
}: {
  role: Role
  setRole: (role: Role) => void
  email: string
  setEmail: (email: string) => void
  password: string
  setPassword: (password: string) => void
  error: string
  onSignIn: () => void
  onForgotPassword: () => void
}) {
  const selectedRole = roleContent[role]

  return (
    <div className="flex flex-col gap-xl">
      <div>
        <p className="text-title text-text-primary">Welcome to eSpace</p>
        <p className="mt-xs text-label-sm text-text-secondary">
          The shared workspace for learning, teaching, and course resources.
        </p>
      </div>

      <div className="rounded-corner-lg bg-surface-bg p-xl">
        <div className="flex flex-col gap-lg">
          <div>
            <p className="text-label font-semibold text-text-primary">
              Choose your role
            </p>
            <p className="mt-xs text-label-sm text-text-secondary">
              We’ll tailor your workspace to how you use the platform.
            </p>
          </div>

          <RadioGroup
            name="account-role"
            value={role}
            onChange={(value) => setRole(value as Role)}
            options={[
              {
                value: 'student',
                label: roleContent.student.label,
                description: roleContent.student.description,
              },
              {
                value: 'instructor',
                label: roleContent.instructor.label,
                description: roleContent.instructor.description,
              },
            ]}
          />
        </div>
      </div>

      <div className="rounded-corner-lg bg-surface-bg p-xl">
        <div className="flex flex-col gap-lg">
          <div>
            <p className="text-label font-semibold text-text-primary">
              Sign in as {selectedRole.label}
            </p>
            <p className="mt-xs text-label-sm text-text-secondary">
              {selectedRole.description}
            </p>
          </div>

          <InputField
            label="Email address"
            placeholder="you@example.com"
            type="email"
            autoComplete="email"
            value={email}
            onChange={setEmail}
            prefix={<Mail size={16} />}
          />
          <InputField
            label="Password"
            placeholder="Enter your password"
            type="password"
            autoComplete="current-password"
            value={password}
            onChange={setPassword}
            prefix={<Lock size={16} />}
          />

          <div className="flex items-center justify-between gap-lg">
            <Checkbox label="Remember me" />
            <Button variant="subtle" size="small" onClick={onForgotPassword}>
              Forgot password?
            </Button>
          </div>

          {error ? (
            <p className="text-label-sm text-danger" role="alert">
              {error}
            </p>
          ) : null}

          <Button
            variant="primary"
            className="w-full"
            iconEnd={<ArrowRight size={16} />}
            onClick={onSignIn}
          >
            Sign in
          </Button>
        </div>
      </div>

    </div>
  )
}

function RecoveryView({
  email,
  setEmail,
  sent,
  onSend,
  onBack,
}: {
  email: string
  setEmail: (email: string) => void
  sent: boolean
  onSend: () => void
  onBack: () => void
}) {
  return (
    <div className="flex flex-col gap-xl">
      <div>
        <Button
          variant="subtle"
          size="small"
          iconStart={<ArrowLeft size={16} />}
          onClick={onBack}
        >
          Back to sign in
        </Button>
        <p className="mt-xl text-title text-text-primary">Reset your password</p>
        <p className="mt-xs text-label-sm text-text-secondary">
          We’ll send a secure reset link to your email address.
        </p>
      </div>

      <div className="rounded-corner-lg bg-surface-bg p-xl">
        <div className="flex flex-col gap-lg">
          {sent ? (
            <div className="flex flex-col items-center gap-lg py-2xl text-center">
              <CheckCircle size={32} className="text-success" />
              <div>
                <p className="text-label font-semibold text-text-primary">
                  Check your inbox
                </p>
                <p className="mt-xs text-label-sm text-text-secondary">
                  If an account exists for {email}, a reset link is on its way.
                </p>
              </div>
              <Button variant="neutral" onClick={onBack}>
                Return to sign in
              </Button>
            </div>
          ) : (
            <>
              <p className="text-label font-semibold text-text-primary">
                Account recovery
              </p>
              <InputField
                label="Email address"
                placeholder="you@example.com"
                type="email"
                autoComplete="email"
                value={email}
                onChange={setEmail}
                prefix={<Mail size={16} />}
              />
              <Button
                variant="primary"
                className="w-full"
                iconEnd={<ArrowRight size={16} />}
                disabled={!email.trim()}
                onClick={onSend}
              >
                Send reset link
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

function SuccessView({
  role,
  onBack,
}: {
  role: Role
  onBack: () => void
}) {
  const selectedRole = roleContent[role]

  return (
    <div className="rounded-corner-lg bg-surface-bg p-xl">
      <div className="flex flex-col items-center gap-lg py-2xl text-center">
        <CheckCircle size={32} className="text-success" />
        <div>
          <p className="text-title text-text-primary">
            Welcome, {selectedRole.label}
          </p>
          <p className="mt-xs text-label-sm text-text-secondary">
            {selectedRole.welcome}
          </p>
        </div>
        <Button
          variant="neutral"
          iconStart={<ArrowLeft size={16} />}
          onClick={onBack}
        >
          Use another account
        </Button>
      </div>
    </div>
  )
}

export default function App() {
  const [view, setView] = useState<View>('login')
  const [role, setRole] = useState<Role>('student')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [recoverySent, setRecoverySent] = useState(false)
  const [activeNav, setActiveNav] = useState<NavSection>('home')

  useEffect(() => {
    document.title = 'eSpace'
  }, [])

  const handleSignIn = () => {
    if (!email.trim() || !password.trim()) {
      setError('Enter your email address and password to continue.')
      return
    }

    setError('')
    setView('success')
  }

  const handleBackToLogin = () => {
    setRecoverySent(false)
    setView('login')
  }

  return (
    <ThemeProvider>
      <AppShell activeNav={activeNav} onNavChange={setActiveNav}>
        {view === 'login' ? (
          <LoginView
            role={role}
            setRole={setRole}
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            error={error}
            onSignIn={handleSignIn}
            onForgotPassword={() => setView('recovery')}
          />
        ) : null}

        {view === 'recovery' ? (
          <RecoveryView
            email={email}
            setEmail={setEmail}
            sent={recoverySent}
            onSend={() => setRecoverySent(true)}
            onBack={handleBackToLogin}
          />
        ) : null}

        {view === 'success' ? (
          <SuccessView role={role} onBack={() => setView('login')} />
        ) : null}
      </AppShell>
    </ThemeProvider>
  )
}
