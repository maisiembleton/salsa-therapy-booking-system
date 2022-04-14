import { getAuth } from 'firebase/auth';
import { FormEventHandler, ReactNode } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

interface Props {
    onSubmit: FormEventHandler<HTMLFormElement>;
    priceId: string;
    children: ReactNode;
}
export const StripeForm: React.FC<Props> = ({
    onSubmit,
    priceId,
    children,
}) => {
    const [user, userLoading, userError] = useAuthState(getAuth());

    return (
        <form
            method="POST"
            action="https://us-central1-salsa-therapy-booking-system.cloudfunctions.net/app/create-checkout-session"
            onSubmit={onSubmit}
        >
            <input name="priceId" type="hidden" value={priceId} />
            <input name="email" type="hidden" value={user?.email ?? ''} />
            {children}
        </form>
    );
};
