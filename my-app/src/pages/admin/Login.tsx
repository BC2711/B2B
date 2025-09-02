import { FaEnvelope, FaLock, FaBoxes, FaMicrosoft } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';
import Input from '../../components/Input';
import { useState, useEffect } from 'react';
import SubmitButton from '../../components/buttons/SubmitButton';
import { useApiMutation } from '../../hooks/useApiMutation';
import { useAuth } from '../../context/AuthContext';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

// Define types for API response
interface UserData {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    phone_number: string;
    status: string;
    role: string;
    created_at: string;
    updated_at: string;
}

interface LoginResponse {
    access_token: string;
    token_type: string;
    data: UserData;
}

interface LoginErrors {
    email?: string;
    password?: string;
    general?: string;
    [key: string]: string | undefined; // Add this line
}

const Login: React.FC = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState<LoginErrors>({});
    const navigate = useNavigate();
    const { isAuthenticated, login } = useAuth();

    // Redirect if already authenticated
    useEffect(() => {
        if (isAuthenticated) {
            navigate('/admin');
        }
    }, [isAuthenticated, navigate]);

    const { mutate, isPending: isSubmitting } = useApiMutation<LoginResponse, { email: string; password: string }>(
        'auth/login-json',
        'POST',
        {
            onSuccess: (response) => {
                if (!response.data) {
                    toast.error('Login response missing data.');
                    return;
                }
                const storage = rememberMe ? localStorage : sessionStorage;
                storage.setItem('authToken', response.data.access_token);
                storage.setItem('userData', JSON.stringify(response.data.data));
                login(response.data.access_token, response.data.data);
                // toast.success('Login successful!');
                // navigate('/admin');
            },
            onError: (error) => {
                const message = error.message || 'Failed to login';
                if (message.includes('email address')) {
                    setErrors((prev) => ({ ...prev, email: message }));
                } else if (message.includes('password')) {
                    setErrors((prev) => ({ ...prev, password: message }));
                } else {
                    setErrors((prev) => ({ ...prev, general: message }));
                }
                toast.error(message);
            },
        }
    );

    const validateForm = () => {
        const newErrors: LoginErrors = {};
        const emailRegex = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
        if (!email) {
            newErrors.email = 'Email is required';
        } else if (!emailRegex.test(email)) {
            newErrors.email = 'Please enter a valid email address';
        }
        if (!password) {
            newErrors.password = 'Password is required';
        } else if (password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrors({});
        if (!validateForm()) {
            toast.error('Please fix the form errors');
            return;
        }
        try {
            await mutate({ email, password });
        } catch (error) {
            // Errors are handled in onError callback
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-50">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <div className="flex justify-center">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-600 shadow-lg">
                        <FaBoxes color="white" size="1.5rem" />
                    </div>
                </div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
                    WholesalePro
                </h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                    B2B Wholesale Management Platform
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
                        <Input
                            labelName="Email"
                            id="email-input"
                            name="email"
                            value={email}
                            icon={FaEnvelope}
                            type="email"
                            placeholder="Enter email address"
                            method={setEmail}
                            errors={errors}

                        />
                        <Input
                            labelName="Password"
                            id="password-input"
                            name="password"
                            value={password}
                            icon={FaLock}
                            type="password"
                            placeholder="Enter your password"
                            method={setPassword}
                            errors={errors}

                        />

                        <div className="flex items-center justify-between">
                            <div className="flex items-center">
                                <input
                                    id="remember-me"
                                    name="remember-me"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                                />
                                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                                    Remember me
                                </label>
                            </div>

                            <div className="text-sm">
                                <a
                                    href="/forget-password"
                                    className="font-medium text-primary-600 hover:text-primary-500"
                                >
                                    Forgot your password?
                                </a>
                            </div>
                        </div>
                        <SubmitButton
                            name={isSubmitting ? 'Signing in...' : 'Sign in'}
                            type="submit"
                            isSubmitting={isSubmitting}
                        />
                    </form>

                    <div className="mt-6">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-300"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-white text-gray-500">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-6 grid grid-cols-2 gap-3">
                            <div>
                                <a
                                    href="/api/auth/google"
                                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <FcGoogle size={18} />
                                    <span className="ml-2">Google</span>
                                </a>
                            </div>
                            <div>
                                <a
                                    href="/api/auth/microsoft"
                                    className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
                                >
                                    <FaMicrosoft color="blue" size={18} />
                                    <span className="ml-2">Microsoft</span>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-6 text-center text-sm text-gray-600">
                    <p>
                        Don't have an account?{' '}
                        <a href="/request-access" className="font-medium text-primary-600 hover:text-primary-500">
                            Request access
                        </a>
                    </p>
                    <p className="mt-2 text-xs text-gray-500">
                        &copy; {new Date().getFullYear()} WholesalePro. All rights reserved.
                    </p>
                </div>
            </div>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick draggable />
        </div>
    );
};

export default Login;