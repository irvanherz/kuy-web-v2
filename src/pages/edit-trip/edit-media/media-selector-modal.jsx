import { Tab } from "@headlessui/react";
import Button from "../../../components/button";
import Modal from "../../../components/modal";

export default function MediaSelectorModal() {
  return (
    <Modal
      title="Select Media"
      visible
      actions={[
        <Button>Close</Button>,
        <Button>Add Selected</Button>,
      ]}
    >
      <div className='flex flex-wrap'>
        <div className='p-2 w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6'>
          <div className='aspect-h-1 aspect-w-1'>
            <button className='bg-gray-200 w-full h-full'>
              <div className='absolute top-1/2 left-0 w-full p-2 transform -translate-y-1/2 text-center'>Add</div>
            </button>
          </div>
        </div>
        <div className='p-2 w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6'>
          <div className='aspect-h-1 aspect-w-1'>
            <button className='bg-gray-200 w-full h-full'>
              <div className='absolute top-1/2 left-0 w-full p-2 transform -translate-y-1/2 text-center'>Add</div>
            </button>
          </div>
        </div>
        <div className='p-2 w-1/3 sm:w-1/4 md:w-1/5 lg:w-1/6'>
          <div className='aspect-h-1 aspect-w-1'>
            <button className='bg-gray-200 w-full h-full'>
              <div className='absolute top-1/2 left-0 w-full p-2 transform -translate-y-1/2 text-center'>Add</div>
            </button>
          </div>
        </div>
      </div>
    </Modal>
  )
}