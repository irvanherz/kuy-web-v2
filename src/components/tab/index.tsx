import classNames from "classnames";
import { Key, ReactElement, ReactNode, useContext, useMemo, useState } from "react";
import TabPanel, { TabPanelProps } from "./tab-panel";

interface TabProps {
  selected: number,
  defaultSelected: number,
  onChange: (index: number) => void,
  children: ReactElement<TabPanelProps, typeof TabPanel>[],
}

interface TabComponent extends React.FC<TabProps> {
  Panel: typeof TabPanel
}

const Tab: TabComponent = ({ selected, defaultSelected, onChange, children }: TabProps) => {
  const [internalSelected, setInternalSelected] = useState<number>()

  const computedSelected = useMemo(() => {
    let val = selected === undefined ? internalSelected : selected
    val = val === undefined ? defaultSelected : val
    return val || 0
  }, [defaultSelected, internalSelected, selected])

  const triggerChange = (newSelected: number) => {
    console.log(newSelected);

    if (computedSelected === newSelected) return
    if (selected === undefined) setInternalSelected(newSelected)
    onChange && onChange(newSelected)
  }

  const activePanel = useMemo(() => {
    return children[computedSelected] || null
  }, [computedSelected, children])

  return (
    <div className='container mx-auto m-5 border rounded-md shadow-lg'>
      <div className='flex border-b'>
        {children.map((child, i) => (
          <button onClick={() => triggerChange(i)} className={classNames('p-3', (i === computedSelected) && 'border-b-2 border-blue-600 text-blue-600 font-bold')}>
            {child.props.tab}
          </button>
        ))}
      </div>
      {activePanel}
    </div>
  )
}

Tab.Panel = TabPanel

export default Tab