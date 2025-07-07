export default function ConfirmEmailPage() {
  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-md text-center">
      <h2 className="text-2xl font-bold mb-4">Check Your Email</h2>
      <p className="mb-4">
        We've sent you an email with a confirmation link. Please check your inbox and click the link to verify your
        account.
      </p>
      <p className="text-sm text-gray-500">If you don't see the email, check your spam folder.</p>
    </div>
  )
}
