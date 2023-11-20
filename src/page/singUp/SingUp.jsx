
import { useContext } from "react";
import { useForm } from "react-hook-form"
import { AuthContext } from "../../providers/AuthProviders";
const SingUp = () => {
    const {createUser,updateUser} = useContext(AuthContext)
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()
    const onSubmit = (data) => {
        createUser(data.email, data.password)
        .then(result=>{
            console.log(result.user);
        })
        .catch(error=>{
            console.log(error);
        })
        updateUser(data.name, data.photoURl)
        .then(result=>result.user)
        .catch(error=>console.log(error))

        console.log(data)
    }
  
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Name</span>
                    </label>
                    <input type="text" name="name" {...register("name", { required: true })} placeholder="Enater your name" className="input input-bordered" />
                    {errors.name && <span className="text-red-500">name is required</span>}
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Email</span>
                    </label>
                    <input type="email" placeholder="Enter your email" name="email" {...register("email", { required: true })} className="input input-bordered" />
                    {errors.name && <span className="text-red-500">Email is required</span>}

                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Password</span>
                    </label>
                    <input type="password" {...register("password", {
                        required: true,
                        minLength: 6,
                        maxLength: 20,
                        pattern: /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&*!])[A-Za-z\d@#$%^&*!]{8,}$/
                    })}
                        name="password" placeholder="password" className="input input-bordered" />
                    {errors.password?.type === "minLength" && (
                        <p role="alert">Password must be 6 carecter</p>
                    )}
                    {errors.password?.type === "maxLength" && (
                        <p className="text-red-500" role="alert">Please ensure your password is at least 15 characters long for better security.</p>
                    )}
                    {errors.password?.type === "pattern" && (
                        <p role="alert">Password should contain at least one uppercase letter, one lowercase letter, one digit, and one special character, and be at least 8 characters long.</p>
                    )}

                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Photo URL</span>
                    </label>
                    <input type="text" {...register("photo", { required: true })} name="photo" placeholder="photo" className="input input-bordered" />
                    {errors.photo && <span className="text-red-500">Photo URL is required</span>}
                </div>
                <div className="form-control mt-6">
                    <button className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    );
};

export default SingUp;