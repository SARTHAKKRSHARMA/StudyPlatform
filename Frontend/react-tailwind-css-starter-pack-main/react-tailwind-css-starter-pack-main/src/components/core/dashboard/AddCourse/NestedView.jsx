import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit, MdDeleteOutline, MdAdd } from "react-icons/md";
import { deleteSection, deleteSubSection } from '../../../../services/operations/courses';
import { setCourse } from '../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import ConfirmationModal from '../../../common/ConfirmationModal';
import { BiDownArrow } from "react-icons/bi";
import SubSectionModal from './SubSectionModal';





const NestedView = ({handleChangeEditSectionName}) => {
    const {course} = useSelector(state => state.course);
    const {token} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [addSubSection, setAddSubSection] = useState(null);
    const [viewSubSection, setViewSubSection] = useState(null);
    const [editSubSection, setEditSubSection] = useState(null);
    const [confirmationModal, setConfirmationModal] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleDeleteSection = async (sectionId) => {
        setLoading(true);
        const result = await deleteSection({courseId : course._id, sectionId : sectionId}, token);
        console.log(result);
        if(result)
        {
            dispatch(setCourse(result));
        } else 
        {
            toast.error("Error occured while deleting section");
        }
        setConfirmationModal(null);
        setLoading(false);
    }

    const handleDeleteSubsection = async (subsectionId, sectionId) => {
        setLoading(true);
        const result = await deleteSubSection({courseId : course._id, sectionId : sectionId, subSectionId : subsectionId}, token);
        console.log(result);
        if(result)
        {
            dispatch(setCourse(result));
        } else 
        {
            toast.error("Error occured while deleting Lecture");
        }
        setConfirmationModal(null);
        setLoading(false);
    }


  return (
    <div className=' bg-richblack-700 w-[95%] mx-auto rounded-md px-2 py-3'>
        <div className=' flex flex-col gap-4'>
            {
                course.courseContent.map((section, index) => {
                    return (
                        <details key={section._id} open>
                            <summary className=' flex flex-row items-center justify-between border-b-[1px] border-b-richblack-400 py-3'>
                                <div className=' flex flex-row items-center gap-2'>
                                    <RxDropdownMenu className=' cursor-pointer' />
                                    <p className=' cursor-pointer'>{section.sectionName}</p>
                                </div>
                                <div className=' flex flex-row items-center gap-2'>
                                    <button onClick={() => { handleChangeEditSectionName(section._id, section.sectionName)}}><MdEdit className=' cursor-pointer' /></button>
                                    <button onClick={() => setConfirmationModal({text1 : "Delete this section", text2 : "All the lectures in this section will be deleted", btn1 : {text : "Delete", action : () => handleDeleteSection(section._id)}, btn2 : { text : "Cancel", action : () => setConfirmationModal(null)}})}><MdDeleteOutline className=' cursor-pointer' /></button>
                                    <span>|</span>
                                    <button><BiDownArrow /></button>
                                </div>
                            </summary>

                            <div className=' flex flex-col items-start justify-start w-[95%] mx-auto py-3'>
                                {
                                    section.subSection.map((subsection, index) => {
                                        return (
                                            <div key={subsection._id}  className=' flex flex-row items-center justify-between border-b-[1px] border-b-richblack-400 py-3 w-full'>
                                                <div onClick={() => setViewSubSection({...subsection})} className=' flex flex-row items-center gap-2'>
                                                    <RxDropdownMenu className=' cursor-pointer' />
                                                    <p className=' cursor-pointer'>{subsection.title}</p>
                                                </div>
                                                <div className=' flex flex-row items-center gap-2'>
                                                    <button onClick={() => setEditSubSection({...subsection, sectionId : section._id})}><MdEdit className=' cursor-pointer' /></button>
                                                    <button onClick={() => setConfirmationModal({text1 : "Delete this subsection", text2 : "Selected lecture will be deleted", btn1 : {text : "Delete", action : () => handleDeleteSubsection(subsection._id, section._id)}, btn2 : { text : "Cancel", action : () => setConfirmationModal(null)}})}><MdDeleteOutline className=' cursor-pointer' /></button>
                                                </div>
                                            </div>
                                        )
                                    })
                                }
                                <button onClick={() => setAddSubSection({sectionId : section._id})} className=' text-yellow-100 font-bold flex flex-row items-center gap-[1px]'><MdAdd /> <span>Add Lecture</span></button>
                            </div>
                        </details>
                    )         
                })
            }
        </div>
        {
            addSubSection ? <SubSectionModal modalData={addSubSection} setModalData={setAddSubSection} add={true} /> : viewSubSection ? <SubSectionModal modalData={viewSubSection} setModalData={setViewSubSection} view={true} /> : editSubSection ? <SubSectionModal modalData={editSubSection} setModalData={setEditSubSection} edit={true} /> : <div></div>               
        } 
        {
            confirmationModal && <ConfirmationModal modalData={confirmationModal} />               
        }
    </div>
  )
}

export default NestedView