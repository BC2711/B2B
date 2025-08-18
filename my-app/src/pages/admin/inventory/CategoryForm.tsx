import React from 'react';
import Input from '../../../components/Input';
import SubmitButton from '../../../components/buttons/SubmitButton';


interface CategoryFormProps {
    initialValues?: {
        category_name?: string;
        description?: string;
        icon?: string;
        status?: string;
    };
    onSubmit: (values: Record<string, string>) => void;
    isLoading?: boolean;
}

const CategoryForm: React.FC<CategoryFormProps> = ({
    initialValues = {},
    onSubmit,
    isLoading = false,
}) => {
    const [formValues, setFormValues] = React.useState({
        category_name: initialValues.category_name || '',
        description: initialValues.description || '',
        icon: initialValues.icon || '',
        status: initialValues.status || 'active',
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormValues(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit(formValues);
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-2xl mx-auto mt-2 p-6 bg-gray-50 rounded-lg shadow-md"
        >
            <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-500 mb-6">
                {initialValues.category_name ? 'Edit Category' : 'Create New Category'}
            </h2>

            <div className="space-y-4">
                <Input
                    name="category_name"
                    labelName="Category Name"
                    value={formValues.category_name}
                    method={handleChange}
                    required
                    placeholder="e.g. Electronics"
                />

                <Input
                    name="description"
                    labelName="Description"
                    value={formValues.description}
                    method={handleChange}
                    placeholder="Brief description of the category"
                />

                <div className="flex space-x-4">
                    <div className="flex-1">
                        <Input
                            name="icon"
                            labelName="Icon"
                            value={formValues.icon}
                            method={handleChange}
                            placeholder="Icon class or URL"
                        />
                    </div>
                    <div className="flex-1">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                            Status
                        </label>
                        <select
                            name="status"
                            value={formValues.status}
                            onChange={(e) => setFormValues(prev => ({ ...prev, status: e.target.value }))}
                            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>
                </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
                <SubmitButton
                    type="button"
                    
                    name='Reset'
                    method={() => setFormValues({
                        category_name: '',
                        description: '',
                        icon: '',
                        status: 'active',
                    })}
                />
                <SubmitButton
                    type="submit"
                    isSubmitting={isLoading}
                    name={initialValues.category_name ? 'Update Category' : 'Create Category'}
                />
            </div>
        </form>
    );
};

export default CategoryForm;