'use client';

import { AuthForm } from '../../components/AuthForm';
import { use } from 'react';
import { AuthType } from '../../common/interfaces';

export default function AuthPage({
  params,
}: {
  params: Promise<{ type: string }>;
}) {
  const resolvedParams = use(params);
  return (
    <div className="grid place-items-center min-h-screen">
      <AuthForm type={resolvedParams.type as AuthType} />
    </div>
  );
}
