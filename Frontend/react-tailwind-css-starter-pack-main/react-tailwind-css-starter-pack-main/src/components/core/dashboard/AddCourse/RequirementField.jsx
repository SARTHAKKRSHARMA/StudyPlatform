import React, { useEffect, useState } from 'react'
import { GiCancel } from "react-icons/gi";
import { useSelector } from 'react-redux';


const RequirementField = ({name, label, register, errors, setValue, getValues}) => {
    const [requirement, setRequirement] = useState("");
    const [requirementList, setRequirementList] = useState([]);
    const {course, editCourse} = useSelector((state) => state.course);

    useEffect(() => {
        register(name, {required : true, validate : (value) => value.length > 0});
        if(editCourse)
        {
            setValue(name, course.requirements);
            setRequirementList(course.requirements);
        }
    }, []);

    useEffect(() => {
        setValue(name, requirementList);
    }, [requirementList])

    const handleAddRequirement = (e) => {
        e.preventDefault();
        if(requirement)
        {
            setRequirementList([...requirementList, requirement]);
            setRequirement("");
        }
    }

    const handleRemoveRequirement = (event ,index) => {
        event.preventDefault()
        const updatedRequirementList = [...requirementList];
        updatedRequirementList.splice(index, 1);
        setRequirementList(updatedRequirementList);
    }

    return (
        <div className=' flex flex-col justify-between gap-2 items-start relative w-[100%]'>
            <label htmlFor={name}>{label}<sup className=' text-[#FF0000]'>*</sup></label>
            <input type='text' id={name} name={name} className=' appearance-none rounded-md  px-2 py-3 text-[16px] bg-richblack-800 outline-none w-full' value={requirement} onChange={(e) => setRequirement(e.target.value)} placeholder='Enter Requirements'/>
            <button onClick={handleAddRequirement} className=' text-yellow-100 font-semibold text-[18px] '>Add</button>
            <div className=' pl-4 max-w-[100%]'>
                <ul className=' list-disc list-outside flex flex-col gap-2 break-words'>
                    {
                        requirementList.map((requirement, index) => (
                            <li key={index} className=' text-richblack-100'>
                                <div className=' flex flex-row items-center gap-4'>
                                    <span>{requirement}</span>
                                    <button onClick={(event) => handleRemoveRequirement(event, index)}><GiCancel  className=' text-[#D22B2B]'/></button>
                                </div>
                            </li>
                        ))
                    }
                </ul>
            </div>
            {
                errors[name] && (
                    <span className=' text-[12px] absolute -bottom-4 font-inter text-[#FF0000]'>Course Requirement is required</span>
                )
            }  
                      
        </div>
  )
}

export default RequirementField