import { zodResolver } from "@hookform/resolvers/zod";
import Alert from "@mui/material/Alert";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormHelperText from "@mui/material/FormHelperText";
import InputLabel from "@mui/material/InputLabel";
import Link from "@mui/material/Link";
import OutlinedInput from "@mui/material/OutlinedInput";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { Eye as EyeIcon } from "@phosphor-icons/react/dist/ssr/Eye";
import { EyeSlash as EyeSlashIcon } from "@phosphor-icons/react/dist/ssr/EyeSlash";
import { GithubLogo } from "@phosphor-icons/react/dist/ssr/GitHubLogo";
import { GoogleLogo } from "@phosphor-icons/react/dist/ssr/GoogleLogo";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { z as zod } from "zod";

import { useStaticTranslation } from "../../hooks/UseTranslation";
import { routes } from "../../routes";
import { IdentityService } from "../../services/identity-service/IdentityService";
import { ServerErrorResponse } from "../../stores/interfaces/ServerError";
import { useUserStore } from "../../stores/UserStore";

const identityService = new IdentityService();

export function SignInForm(): React.JSX.Element {
  const { t } = useStaticTranslation();
  const schema = zod.object({
    email: zod
      .string()
      .min(1, { message: t("auth.fields.validation.emailAddress") })
      .email(),
    password: zod
      .string()
      .min(1, { message: t("auth.fields.validation.password") }),
  });
  type Values = zod.infer<typeof schema>;
  // const defaultValues = {
  //   email: "test@test.com",
  //   password: "Qwerty1234!",
  // } satisfies Values;

  const navigate = useNavigate();
  const { signIn } = useUserStore();
  const { checkSession } = { checkSession: () => Promise.resolve() };
  const [showPassword, setShowPassword] = React.useState<boolean>();
  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      try {
        await signIn(undefined, values.email, values.password);

        navigate(routes.home);
      } catch (error: unknown) {
        const knownError = error as ServerErrorResponse;
        const message = knownError.response?.data?.detail;

        setError("root", { type: "server", message : (message || t("auth.errors.signIn")) });
      }

      setIsPending(false);
      await checkSession?.();
    },
    [checkSession, setError]
  );

  const handleOAuthLogin = (provider: string) => {
    window.location.href = identityService.getOAuthUrl(provider);
  };

  return (
    <Stack spacing={4}>
      <Stack spacing={1}>
        <Typography variant="h4">Sign in</Typography>
        <Typography color="text.secondary" variant="body2">
          {t("auth.actions.dontHaveAccount")}{" "}
          <Link
            component={RouterLink}
            to={routes.signUp}
            underline="hover"
            variant="subtitle2"
          >
            {t("auth.actions.signUp")}
          </Link>
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)} required>
                <InputLabel>{t("auth.fields.emailAddress")}</InputLabel>
                <OutlinedInput
                  {...field}
                  label={t("auth.fields.emailAddress")}
                  type="email"
                />
                {errors.email ? (
                  <FormHelperText>{errors.email.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)} required>
                <InputLabel>{t("auth.fields.password")}</InputLabel>
                <OutlinedInput
                  {...field}
                  endAdornment={
                    showPassword ? (
                      <EyeIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(false);
                        }}
                      />
                    ) : (
                      <EyeSlashIcon
                        cursor="pointer"
                        fontSize="var(--icon-fontSize-md)"
                        onClick={(): void => {
                          setShowPassword(true);
                        }}
                      />
                    )
                  }
                  label={t("auth.fields.password")}
                  type={showPassword ? "text" : "password"}
                />
                {errors.password ? (
                  <FormHelperText>{errors.password.message}</FormHelperText>
                ) : null}
              </FormControl>
            )}
          />
          <div>
            <Link
              component={RouterLink}
              to={routes.forgotPassword}
              variant="subtitle2"
            >
              {t("auth.actions.forgotPassword")}
            </Link>
          </div>
          {errors.root ? (
            <Alert color="error">{errors.root.message}</Alert>
          ) : null}
          <Button disabled={isPending} type="submit" variant="contained">
            {t("auth.actions.signIn")}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleOAuthLogin("github")}
            startIcon={<GithubLogo weight="bold"/>}
            disabled={isPending}
          >
            {t("auth.actions.signInWithGithub")}
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => handleOAuthLogin("google")}
            startIcon={<GoogleLogo weight="bold"/>}
            disabled={isPending}
          >
            {t("auth.actions.signInWithGoogle")}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
