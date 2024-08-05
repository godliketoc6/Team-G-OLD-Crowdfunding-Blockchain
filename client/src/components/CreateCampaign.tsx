import { TCreateCampaignSchema, createCampaignSchema } from '../utils/CampaignTypes';
import { useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import DatePicker from "./Datepicker";
import { useStateContext } from '../context';
import { checkIfImage } from '../utils';
import { ethers } from 'ethers';

export const CreateCampaign = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const { connect, address, createCampaign } = useStateContext();
    const [date, setDate] = useState<Date | null>(null); // Start with null for no date selected

    const {
        register,
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        reset,
        setValue,
    } = useForm<TCreateCampaignSchema>({
        resolver: zodResolver(createCampaignSchema),
        defaultValues: {
            deadline: null,
        },
    });

    const onSubmit = async (data: TCreateCampaignSchema) => {
        const deadline = data.deadline || new Date(); 

        checkIfImage(data.image, async (exists) => {
            if(exists) {
                setIsLoading(true);
                toast.loading('Creating campaign...');
                try {
                    // await createCampaign({
                    //     ...data,
                    //     target: ethers.utils.parseUnits(data.target, 18), // Ensure target is a string
                    //     deadline: data.deadline ? data.deadline : new Date(), // Use current date if no deadline is set
                    // });
                    toast.dismiss();
                    toast.success('Campaign created successfully!');
                    setTimeout(() => {
                        window.location.reload(); // Refresh the page after 1 second
                    }, 1000);
                } catch (error) {
                    toast.dismiss();
                    toast.error('Failed to create campaign. Please try again.');
                } finally {
                    setIsLoading(false);
                }
            } else {
                toast.error('Image file must be a valid image format (jpg, png, gif).');
                reset({ ...data, image: '' });
            }
        });
        console.log(data);
    };

    useEffect(() => {
        Object.values(errors).forEach((error) => {
            if (error && error.message) {
                toast.error(error.message);
            }
        });
    }, [errors]);

    

    const handleClick = () => {
        toast('Please note that the submitted field is immutable!', {icon: '⚠️'});
    };

    return (
        <div className="drawer-end z-50">
            <input id="my-drawer" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content">
                <label htmlFor="my-drawer" className="btn btn-primary drawer-button text-lg" onClick={handleClick}>
                    Campaign
                </label>
            </div>
            <div className="drawer-side">
                <label
                    htmlFor="my-drawer"
                    aria-label="close sidebar"
                    className="drawer-overlay"
                ></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    <a className="text-xl p-4">Create campaign</a>
                    <form onSubmit={handleSubmit(onSubmit)} >
                    <li className="py-2">
                        <input
                            {...register('name')}   
                            type="text"
                            placeholder="Name"
                            className="input w-full max-w-xs"
                        />
                    </li>
                    <li className="py-2">
                        <input
                            {...register('title')} 
                            type="text"
                            placeholder="Campaign title"
                            className="input w-full max-w-xs"
                        />
                    </li>
                    <li className="py-2">
                        <textarea
                            {...register('description')} 
                            className="textarea textarea-bordered"
                            placeholder="Story" />
                    </li>
                    <li className="py-2">
                        <input
                            {...register('target')}  
                            type="text"
                            placeholder="Goal"
                            className="input w-full max-w-xs"
                        />
                    </li>
                    <li className="py-2">
                        <Controller
                            name="deadline"
                            control={control}
                            render={({ field }) => (
                                <DatePicker
                                    {...register('target')}
                                    value={field.value}
                                    onChange={(date) => field.onChange(date)}
                                    placeholder="Select Deadline"
                                    minDate={new Date()}
                                />
                            )}
                        />
                    </li>
                    <li className="py-2">
                        <input
                            {...register('image')}  
                            type="text"
                            placeholder="Campaign image"
                            className="input w-full max-w-xs"
                        />
                    </li>
                    <div className="pt-2 flex justify-end">
                        <button type="submit" className="btn btn-primary" disabled={isLoading}>
                            {isLoading ? 'Submitting...' : 'Submit!'}
                        </button>
                    </div>
                    </form>
                </ul>
            </div>
        </div>
    );
};

