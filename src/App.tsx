import { FormEvent, useEffect, useState } from "react"
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Check,
  CheckCircle2,
  Eye,
  EyeOff,
  GraduationCap,
  LockKeyhole,
  Mail,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react"

type Role = "student" | "instructor"
type View = "login" | "recovery" | "success"

const roleDetails = {
  student: {
    label: "Student",
    icon: GraduationCap,
    welcome: "Your learning space is ready.",
  },
  instructor: {
    label: "Instructor",
    icon: BookOpen,
    welcome: "Your teaching space is ready.",
  },
}

function Brand() {
  return (
    <div className="flex items-center gap-3">
      <div className="brand-mark" aria-hidden="true">
        <span />
        <span />
      </div>
      <span className="text-lg font-bold tracking-[-0.04em] text-slate-950">
        eSpace
      </span>
    </div>
  )
}

function SocialIcon({ provider }: { provider: "google" | "apple" }) {
  if (provider === "apple") {
    return (
      <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
        <path
          fill="currentColor"
          d="M17.05 12.54c-.03-3.16 2.58-4.69 2.7-4.76a5.8 5.8 0 0 0-4.57-2.47c-1.92-.2-3.79 1.15-4.77 1.15-.99 0-2.49-1.13-4.1-1.1a6.05 6.05 0 0 0-5.1 3.1c-2.21 3.83-.56 9.46 1.55 12.56 1.06 1.52 2.29 3.21 3.9 3.15 1.58-.07 2.17-1.01 4.07-1.01 1.88 0 2.44 1.01 4.09.97 1.69-.03 2.76-1.52 3.78-3.05a12.55 12.55 0 0 0 1.73-3.52 5.46 5.46 0 0 1-3.28-5.02ZM13.93 3.27A5.55 5.55 0 0 0 15.2-.72a5.66 5.66 0 0 0-3.66 1.9 5.28 5.28 0 0 0-1.3 3.84 4.68 4.68 0 0 0 3.69-1.75Z"
        />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="size-5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.8 12.23c0-.71-.06-1.4-.18-2.07H12v3.92h5.5a4.7 4.7 0 0 1-2.04 3.08v2.55h3.3c1.92-1.78 3.04-4.4 3.04-7.48Z"
      />
      <path
        fill="#34A853"
        d="M12 22.2c2.75 0 5.05-.91 6.74-2.49l-3.29-2.55c-.91.61-2.08.98-3.45.98-2.65 0-4.9-1.8-5.7-4.2H2.9v2.63A10.18 10.18 0 0 0 12 22.2Z"
      />
      <path
        fill="#FBBC05"
        d="M6.3 13.94A6.13 6.13 0 0 1 5.98 12c0-.68.12-1.33.32-1.94V7.43H2.9A10.2 10.2 0 0 0 1.8 12c0 1.65.4 3.2 1.1 4.57l3.4-2.63Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.86c1.5 0 2.84.52 3.9 1.53l2.92-2.93A9.82 9.82 0 0 0 12 1.8a10.18 10.18 0 0 0-9.1 5.63l3.4 2.63c.8-2.4 3.05-4.2 5.7-4.2Z"
      />
    </svg>
  )
}

export default function App() {
  const [view, setView] = useState<View>("login")
  const [role, setRole] = useState<Role>("student")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(true)
  const [error, setError] = useState("")
  const [recoverySent, setRecoverySent] = useState(false)
  const selectedRole = roleDetails[role]

  useEffect(() => {
    document.title = "Welcome back · eSpace"
  }, [])

  const handleSignIn = (event: FormEvent) => {
    event.preventDefault()
    if (!email.trim() || !password.trim()) {
      setError("Enter your email address and password to continue.")
      return
    }
    setError("")
    setView("success")
  }

  const handleRecovery = (event: FormEvent) => {
    event.preventDefault()
    if (email.trim()) setRecoverySent(true)
  }

  const backToLogin = () => {
    setView("login")
    setRecoverySent(false)
    setError("")
  }

  return (
    <main className="min-h-screen bg-[#f6f6fb] p-2 sm:p-3 lg:p-4">
      <div className="mx-auto grid min-h-[calc(100vh-1rem)] max-w-[1560px] overflow-hidden rounded-[26px] bg-white shadow-[0_24px_80px_rgba(37,26,76,0.10)] sm:min-h-[calc(100vh-1.5rem)] sm:rounded-[32px] lg:min-h-[calc(100vh-2rem)] lg:grid-cols-[1.08fr_0.92fr]">
        <section className="hero-panel relative hidden overflow-hidden p-10 lg:flex lg:flex-col xl:p-14">
          <div className="orb orb-one" />
          <div className="orb orb-two" />
          <div className="relative z-10">
            <Brand />
          </div>

          <div className="relative z-10 my-auto max-w-[640px] py-16">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/60 px-4 py-2 text-xs font-bold tracking-[0.12em] text-violet-800 uppercase shadow-sm backdrop-blur-md">
              <Sparkles className="size-3.5" />
              One space. Limitless learning.
            </div>
            <h1 className="display-title max-w-[610px] text-[clamp(3.6rem,5.2vw,6.7rem)] leading-[0.91] tracking-[-0.065em] text-slate-950">
              Learn boldly.
              <br />
              <span className="text-violet-700">Grow together.</span>
            </h1>
            <p className="mt-8 max-w-[510px] text-[17px] leading-7 text-slate-600">
              Your classes, ideas, and community—all in one beautifully simple
              workspace designed to keep you moving forward.
            </p>

            <div className="mt-11 flex flex-wrap gap-3">
              <div className="feature-pill">
                <div className="icon-tile bg-violet-600 text-white">
                  <Users className="size-4" />
                </div>
                <div>
                  <strong>32k+</strong>
                  <span>active learners</span>
                </div>
              </div>
              <div className="feature-pill">
                <div className="icon-tile bg-amber-300 text-amber-950">
                  <ShieldCheck className="size-4" />
                </div>
                <div>
                  <strong>Secure</strong>
                  <span>by design</span>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 flex items-center gap-3 text-xs font-medium text-slate-500">
            <span className="flex -space-x-2">
              {["#5b44d1", "#f1b74c", "#2d9c83"].map((color, index) => (
                <span
                  key={color}
                  className="grid size-8 place-items-center rounded-full border-2 border-white text-[10px] font-bold text-white"
                  style={{ backgroundColor: color, zIndex: 3 - index }}
                >
                  {["AK", "MS", "JL"][index]}
                </span>
              ))}
            </span>
            Trusted by learners in 84 countries
          </div>
        </section>

        <section className="relative flex min-h-[calc(100vh-1rem)] flex-col px-5 py-6 sm:min-h-[calc(100vh-1.5rem)] sm:px-10 sm:py-8 lg:min-h-0 lg:px-14 xl:px-24">
          <div className="flex items-center justify-between lg:justify-end">
            <div className="lg:hidden">
              <Brand />
            </div>
            <p className="hidden text-sm text-slate-500 sm:block">
              Secure access for the eSpace community
            </p>
          </div>

          <div className="mx-auto flex w-full max-w-[470px] flex-1 items-center py-10 sm:py-14">
            <div key={view} className="view-enter w-full">
              {view === "login" && (
                <>
                  <div className="mb-8 sm:mb-9">
                    <p className="mb-3 text-sm font-bold tracking-[0.08em] text-violet-700 uppercase">
                      Welcome back
                    </p>
                    <h2 className="text-4xl font-bold tracking-[-0.045em] text-slate-950 sm:text-[44px]">
                      Sign in to eSpace
                    </h2>
                    <p className="mt-3 text-[15px] leading-6 text-slate-500">
                      Pick up right where you left off.
                    </p>
                  </div>

                  <div className="mb-7 grid grid-cols-2 gap-2 rounded-2xl bg-slate-100/80 p-1.5">
                    {(Object.keys(roleDetails) as Role[]).map((item) => {
                      const Icon = roleDetails[item].icon
                      const active = item === role
                      return (
                        <button
                          key={item}
                          type="button"
                          onClick={() => setRole(item)}
                          className={`flex items-center justify-center gap-2 rounded-xl px-3 py-3 text-sm font-bold transition-all ${
                            active
                              ? "bg-white text-violet-700 shadow-[0_4px_16px_rgba(54,40,99,0.10)]"
                              : "text-slate-500 hover:text-slate-800"
                          }`}
                          aria-pressed={active}
                        >
                          <Icon className="size-[18px]" />
                          {roleDetails[item].label}
                        </button>
                      )
                    })}
                  </div>

                  <form onSubmit={handleSignIn} noValidate>
                    <label className="field-label" htmlFor="email">
                      Email address
                    </label>
                    <div className="field-shell">
                      <Mail className="size-[18px] text-slate-400" />
                      <input
                        id="email"
                        type="email"
                        autoComplete="email"
                        placeholder="name@example.com"
                        value={email}
                        onChange={(event) => {
                          setEmail(event.target.value)
                          setError("")
                        }}
                        className="field-input"
                      />
                    </div>

                    <div className="mt-5 flex items-center justify-between">
                      <label className="field-label" htmlFor="password">
                        Password
                      </label>
                      <button
                        type="button"
                        onClick={() => setView("recovery")}
                        className="text-xs font-bold text-violet-700 hover:text-violet-900"
                      >
                        Forgot password?
                      </button>
                    </div>
                    <div className="field-shell">
                      <LockKeyhole className="size-[18px] text-slate-400" />
                      <input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        autoComplete="current-password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(event) => {
                          setPassword(event.target.value)
                          setError("")
                        }}
                        className="field-input"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword((current) => !current)}
                        className="rounded-lg p-1 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOff className="size-[18px]" />
                        ) : (
                          <Eye className="size-[18px]" />
                        )}
                      </button>
                    </div>

                    <label className="mt-4 flex w-fit cursor-pointer items-center gap-2.5 text-sm text-slate-600">
                      <input
                        type="checkbox"
                        checked={remember}
                        onChange={(event) => setRemember(event.target.checked)}
                        className="peer sr-only"
                      />
                      <span className="grid size-[18px] place-items-center rounded-[5px] border border-slate-300 bg-white text-white transition peer-checked:border-violet-600 peer-checked:bg-violet-600 peer-focus-visible:ring-2 peer-focus-visible:ring-violet-400 peer-focus-visible:ring-offset-2">
                        {remember && (
                          <Check className="size-3" strokeWidth={3} />
                        )}
                      </span>
                      Keep me signed in
                    </label>

                    {error && (
                      <p
                        className="mt-4 rounded-xl bg-red-50 px-4 py-3 text-sm font-medium text-red-700"
                        role="alert"
                      >
                        {error}
                      </p>
                    )}

                    <button type="submit" className="primary-button mt-6">
                      Sign in as {selectedRole.label}
                      <ArrowRight className="size-[18px]" />
                    </button>
                  </form>

                  <div className="my-7 flex items-center gap-4 text-[11px] font-bold tracking-[0.1em] text-slate-400 uppercase">
                    <span className="h-px flex-1 bg-slate-200" />
                    or continue with
                    <span className="h-px flex-1 bg-slate-200" />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      className="social-button"
                      onClick={() => setView("success")}
                    >
                      <SocialIcon provider="google" />
                      Google
                    </button>
                    <button
                      type="button"
                      className="social-button"
                      onClick={() => setView("success")}
                    >
                      <SocialIcon provider="apple" />
                      Apple
                    </button>
                  </div>
                  <p className="mt-7 text-center text-xs leading-5 text-slate-400">
                    By continuing, you agree to eSpace’s Terms and Privacy
                    Policy.
                  </p>
                </>
              )}

              {view === "recovery" && (
                <div>
                  <button
                    type="button"
                    onClick={backToLogin}
                    className="mb-8 flex items-center gap-2 text-sm font-bold text-slate-500 transition hover:text-violet-700"
                  >
                    <ArrowLeft className="size-4" />
                    Back to sign in
                  </button>
                  {recoverySent ? (
                    <div className="text-center">
                      <div className="mx-auto grid size-16 place-items-center rounded-2xl bg-emerald-50 text-emerald-600">
                        <CheckCircle2 className="size-8" />
                      </div>
                      <h2 className="mt-7 text-4xl font-bold tracking-[-0.04em] text-slate-950">
                        Check your inbox
                      </h2>
                      <p className="mx-auto mt-4 max-w-sm leading-7 text-slate-500">
                        If an account exists for{" "}
                        <strong className="font-semibold text-slate-700">
                          {email}
                        </strong>
                        , a secure reset link is on its way.
                      </p>
                      <button
                        type="button"
                        onClick={backToLogin}
                        className="primary-button mt-8"
                      >
                        Return to sign in
                      </button>
                    </div>
                  ) : (
                    <>
                      <p className="mb-3 text-sm font-bold tracking-[0.08em] text-violet-700 uppercase">
                        Account recovery
                      </p>
                      <h2 className="text-4xl font-bold tracking-[-0.045em] text-slate-950">
                        Reset your password
                      </h2>
                      <p className="mt-4 mb-8 leading-7 text-slate-500">
                        Enter your email and we’ll send you a secure link to get
                        back into your account.
                      </p>
                      <form onSubmit={handleRecovery}>
                        <label className="field-label" htmlFor="recovery-email">
                          Email address
                        </label>
                        <div className="field-shell">
                          <Mail className="size-[18px] text-slate-400" />
                          <input
                            id="recovery-email"
                            type="email"
                            required
                            autoComplete="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="field-input"
                          />
                        </div>
                        <button type="submit" className="primary-button mt-6">
                          Send reset link
                          <ArrowRight className="size-[18px]" />
                        </button>
                      </form>
                    </>
                  )}
                </div>
              )}

              {view === "success" && (
                <div className="text-center">
                  <div className="success-ring mx-auto">
                    <CheckCircle2 className="size-10" />
                  </div>
                  <p className="mt-8 text-sm font-bold tracking-[0.08em] text-emerald-600 uppercase">
                    You’re signed in
                  </p>
                  <h2 className="mt-3 text-4xl font-bold tracking-[-0.045em] text-slate-950 sm:text-[44px]">
                    Welcome, {selectedRole.label}
                  </h2>
                  <p className="mt-4 text-[16px] leading-7 text-slate-500">
                    {selectedRole.welcome}
                  </p>
                  <div className="mt-8 rounded-2xl bg-emerald-50 px-5 py-4 text-sm font-bold text-emerald-700">
                    Your workspace has been unlocked
                  </div>
                  <button
                    type="button"
                    onClick={backToLogin}
                    className="mt-5 text-sm font-bold text-slate-500 transition hover:text-violet-700"
                  >
                    Use another account
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center justify-center gap-5 text-xs text-slate-400 sm:justify-between">
            <span>© 2025 eSpace</span>
            <span className="flex gap-5">
              <span>Privacy protected</span>
              <span>Help center</span>
            </span>
          </div>
        </section>
      </div>
    </main>
  )
}
