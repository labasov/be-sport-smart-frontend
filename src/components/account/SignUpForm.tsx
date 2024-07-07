'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import InputLabel from '@mui/material/InputLabel';
import Link from '@mui/material/Link';
import OutlinedInput from '@mui/material/OutlinedInput';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { enqueueSnackbar } from 'notistack';
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Trans } from 'react-i18next';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { z as zod } from 'zod';

import { useStaticTranslation } from '../../hooks/UseTranslation';
import { routes } from '../../routes';
import { ServerErrorResponse } from '../../stores/interfaces/ServerError';
import { useUserStore } from '../../stores/UserStore';




export function SignUpForm(): React.JSX.Element {
  const { t } = useStaticTranslation();
  const schema = zod.object({
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    email: zod.string().min(1, { message: t('auth.fields.validation.emailAddress') }).email(),
    password: zod.string().min(6, { message: t('auth.fields.validation.passwordMinLength') }),
    terms: zod.boolean().refine((value) => value, t('auth.fields.validation.terms')),
  });
  type Values = zod.infer<typeof schema>;
  const defaultValues = { firstName: '', lastName: '', email: '', password: '', terms: false } satisfies Values;

  const { signUp } = useUserStore();
  const navigate = useNavigate();
  const { checkSession } = { checkSession: () => Promise.resolve() };
  const [isPending, setIsPending] = React.useState<boolean>(false);

  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<Values>({ defaultValues, resolver: zodResolver(schema) });

  const onSubmit = React.useCallback(
    async (values: Values): Promise<void> => {
      setIsPending(true);

      try {
        await signUp(undefined, values.email, values.password);

        enqueueSnackbar(t("auth.accountCreated", { email : values.email }), { variant: 'success' });
        navigate(routes.signIn);
      }
      catch (error: unknown) {
        const knownError = error as ServerErrorResponse;

        const message = knownError.response?.data?.detail;

        setError('root', { type: 'server', message });
      }
      
      setIsPending(false);

      // Refresh the auth state
      await checkSession?.();

      // UserProvider, for this case, will not refresh the router
      // After refresh, GuestGuard will handle the redirect
      //router.refresh();
    },
    [checkSession, setError]
  );

  return (
    <Stack spacing={3}>
      <Stack spacing={1}>
        <Typography variant="h4">Sign up</Typography>
        <Typography color="text.secondary" variant="body2">
          {t('auth.actions.alreadyHaveAccount')}{' '}
          <Link component={RouterLink} to={routes.signIn} underline="hover" variant="subtitle2">
            {t('auth.actions.signIn')}
          </Link>
        </Typography>
      </Stack>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={2}>
          <Controller
            control={control}
            name="firstName"
            render={({ field }) => (
              <FormControl error={Boolean(errors.firstName)}>
                <InputLabel>{t("auth.fields.firstName")}</InputLabel>
                <OutlinedInput {...field} label={t("auth.fields.firstName")} />
                {errors.firstName ? <FormHelperText>{errors.firstName.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="lastName"
            render={({ field }) => (
              <FormControl error={Boolean(errors.lastName)}>
                <InputLabel>{t("auth.fields.lastName")}</InputLabel>
                <OutlinedInput {...field} label={t("auth.fields.lastName")} />
                {errors.lastName ? <FormHelperText>{errors.lastName.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({ field }) => (
              <FormControl error={Boolean(errors.email)} required>
                <InputLabel>{t("auth.fields.emailAddress")}</InputLabel>
                <OutlinedInput {...field} label={t("auth.fields.emailAddress")} type="email" />
                {errors.email ? <FormHelperText>{errors.email.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({ field }) => (
              <FormControl error={Boolean(errors.password)} required>
                <InputLabel>{t("auth.fields.password")}</InputLabel>
                <OutlinedInput {...field} label={t("auth.fields.password")} type="password" />
                {errors.password ? <FormHelperText>{errors.password.message}</FormHelperText> : null}
              </FormControl>
            )}
          />
          <Controller
            control={control}
            name="terms"
            render={({ field }) => (
              <div>
                <FormControlLabel
                  control={<Checkbox {...field} />}
                  label={
                    <Trans
                      i18nKey="auth.actions.iHaveRead"
                      components={[<Link component={RouterLink} to={routes.terms}></Link>]}
                    />
                  }
                />
                {errors.terms ? <FormHelperText error>{errors.terms.message}</FormHelperText> : null}
              </div>
            )}
          />
          {errors.root ? <Alert color="error">{errors.root.message}</Alert> : null}
          <Button disabled={isPending} type="submit" variant="contained">
            {t('auth.actions.signUp')}
          </Button>
        </Stack>
      </form>
    </Stack>
  );
}
