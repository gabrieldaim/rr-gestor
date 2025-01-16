import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { LoginForm } from "@/lib/utils/Form/LoginForm"

export function LoginFormScreen({
  className,
  ...props
}: React.ComponentProps<"div">) {

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="overflow-hidden">
        <CardContent className="grid p-0 md:grid-cols-2">
          <LoginForm />
          <div className="relative hidden bg-muted md:block">
            <img
              src="./../../public/img-login.webp"
              alt="Image"
              className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </CardContent>
      </Card>
      <div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 hover:[&_a]:text-primary">
        Ao clicar em continuar, você concorda com nossos <a href="#">Termos de Serviço</a> e <a href="#">Política de Privacidade</a>.
      </div>
    </div>
  )
}
