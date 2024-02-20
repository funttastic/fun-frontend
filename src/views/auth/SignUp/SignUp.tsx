import SignUpForm from './SignUpForm'

const SignUp = () => {
    return (
        <>
            <div className="mb-8">
                <h2 className="mb-1">Sign Up</h2>
            </div>
            <SignUpForm disableSubmit={false} />
        </>
    )
}

export default SignUp
