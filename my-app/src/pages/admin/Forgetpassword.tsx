import React, { useState } from 'react'
import { FaBoxes, FaCheckCircle, FaEnvelope } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input';
import SubmitButton from '../../components/buttons/SubmitButton';

const Forgetpassword: React.FC = () => {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState<{ email?: string; general?: string }>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        const newErrors: typeof errors = {};

        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            newErrors.email = 'Please enter a valid email';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) return;

        setIsSubmitting(true);
        setErrors({});

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1500));
            setIsSuccess(true);
        } catch (error) {
            setErrors({ general: 'Failed to send reset link. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }
    };

    if (isSuccess) {
        return (
            <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    {/* Logo */}
                    <div className="flex justify-center">
                        <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-600 shadow-lg">
                            <FaBoxes color='white' />
                        </div>
                    </div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                        Password Reset Sent
                    </h2>
                </div>

                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 text-center">
                        <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                            <FaCheckCircle color='green' />
                        </div>
                        <div className="mt-3">
                            <h3 className="text-lg font-medium text-gray-900">Check your email</h3>
                            <div className="mt-2 text-sm text-gray-600">
                                <p>We've sent a password reset link to <span className="font-medium">{email}</span></p>
                                <p className="mt-2">If you don't see it, check your spam folder.</p>
                            </div>
                        </div>
                        <div className="mt-5">
                            <button
                                onClick={() => navigate('/')}
                                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gray-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                            >
                                Return to login
                            </button>
                        </div>
                    </div>

                    <div className="mt-6 text-center text-sm text-gray-600">
                        <p className="mt-2 text-xs text-gray-500">
                            &copy; {new Date().getFullYear()} WholesalePro. All rights reserved.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                {/* Logo */}
                <div className="flex justify-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-600 shadow-lg">
                        <FaBoxes color='white' />
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    Reset your password
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    Enter your email to receive a reset link
                </p>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    {errors.general && (
                        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-md text-sm">
                            {errors.general}
                        </div>
                    )}

                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <Input labelName='Business Email' name='email' id='email' type='email' icon={FaEnvelope} placeholder='Enter your Business email' value={email} method={setEmail} />
                        <SubmitButton name={isSubmitting ? "Sending..." : "Send Reset Link"} type='submit' isSubmitting={isSubmitting} />
                    </form>

                    <div className="mt-6 text-center text-sm">
                        <button
                            onClick={() => navigate('/')}
                            className="font-medium text-primary-600 hover:text-primary-500"
                        >
                            Remember your password? Sign in
                        </button>
                    </div>
                </div>

                <div className="mt-6 text-center text-sm text-gray-600">
                    <p className="mt-2 text-xs text-gray-500">
                        &copy; {new Date().getFullYear()} WholesalePro. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Forgetpassword