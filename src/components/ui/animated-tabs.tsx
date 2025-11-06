'use client'

import React from 'react'

import { AnimatePresence, motion, Transition } from 'motion/react'

import { Tab, useTabs } from '@/hooks/useTabs'
import { cn } from '@/lib/utils'

interface AnimatedTabsProps {
  tabs: Tab[]
}

const transition: Transition = {
  type: 'tween',
  ease: 'easeOut',
  duration: 0.15,
}

const getHoverAnimationProps = (hoveredRect: DOMRect, navRect: DOMRect) => ({
  x: hoveredRect.left - navRect.left - 10,
  y: hoveredRect.top - navRect.top - 4,
  width: hoveredRect.width + 20,
  height: hoveredRect.height + 10,
})

const TabContent = ({ tab }: { tab: Tab }) => {
  return (
    <motion.div
      key={tab.value}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={transition}
      className="px-2 py-6 bg-transparent mt-4 h-full overflow-auto"
    >
      {tab.content ? (
        tab.content
      ) : (
        <p className="text-muted-foreground">No content available for this tab.</p>
      )}
    </motion.div>
  )
}

const Tabs = ({
  tabs,
  selectedTabIndex,
  setSelectedTab,
}: {
  tabs: Tab[]
  selectedTabIndex: number
  setSelectedTab: (input: [number, number]) => void
}) => {
  const [buttonRefs, setButtonRefs] = React.useState<Array<HTMLButtonElement | null>>([])

  React.useEffect(() => {
    setButtonRefs((prev) => prev.slice(0, tabs.length))
  }, [tabs.length])

  const navRef = React.useRef<HTMLDivElement>(null)
  const navRect = navRef.current?.getBoundingClientRect()

  const selectedRect = buttonRefs[selectedTabIndex]?.getBoundingClientRect()

  const [hoveredTabIndex, setHoveredTabIndex] = React.useState<number | null>(null)
  const hoveredRect = buttonRefs[hoveredTabIndex ?? -1]?.getBoundingClientRect()

  return (
    <nav
      ref={navRef}
      className="flex flex-shrink-0 justify-center items-center relative z-0 py-2"
      onPointerLeave={() => setHoveredTabIndex(null)}
    >
      {tabs.map((item, i) => {
        const isActive = selectedTabIndex === i

        return (
          <button
            key={item.value}
            className="text-sm relative rounded-md flex items-center h-8 px-4 z-20 bg-transparent cursor-pointer select-none transition-colors"
            onPointerEnter={() => setHoveredTabIndex(i)}
            onFocus={() => setHoveredTabIndex(i)}
            onClick={() => setSelectedTab([i, i > selectedTabIndex ? 1 : -1])}
          >
            <motion.span
              ref={(el) => {
                buttonRefs[i] = el as HTMLButtonElement
              }}
              className={cn(
                'text-xs md:text-md lg:text-xl font-space-grotesk flex gap-1 items-center',
                {
                  'text-muted-foreground': !isActive,
                  'font-semibold text-primary': isActive,
                  'text-red-500': item.value === 'danger-zone' && isActive,
                  'text-white':
                    hoveredTabIndex === tabs.findIndex(({ value }) => value === item.value),
                }
              )}
            >
              {item.icon}
              <span className="">{item.label}</span>
            </motion.span>
          </button>
        )
      })}

      <AnimatePresence>
        {hoveredRect && navRect && (
          <motion.div
            key="hover"
            className={`absolute z-10 top-0 left-0 rounded-md ${
              hoveredTabIndex === tabs.findIndex(({ value }) => value === 'danger-zone')
                ? 'bg-red-500 dark:bg-red-500'
                : 'bg-primary'
            }`}
            initial={{ ...getHoverAnimationProps(hoveredRect, navRect), opacity: 0 }}
            animate={{ ...getHoverAnimationProps(hoveredRect, navRect), opacity: 1 }}
            exit={{ ...getHoverAnimationProps(hoveredRect, navRect), opacity: 0 }}
            transition={transition}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {selectedRect && navRect && (
          <motion.div
            className={`absolute z-10 bottom-0 left-0 h-[2px] ${
              selectedTabIndex === tabs.findIndex(({ value }) => value === 'danger-zone')
                ? 'bg-red-500'
                : 'bg-primary'
            }`}
            initial={false}
            animate={{
              width: selectedRect.width + 18,
              x: `calc(${selectedRect.left - navRect.left - 9}px)`,
              opacity: 1,
            }}
            transition={transition}
          />
        )}
      </AnimatePresence>
    </nav>
  )
}

export function AnimatedTabs({ tabs }: AnimatedTabsProps) {
  const [hookProps] = React.useState(() => ({
    tabs,
    initialTabId: tabs[0]?.value || 'default',
  }))
  const framer = useTabs(hookProps)

  return (
    <div className="w-full">
      <div className="relative flex w-full items-center justify-between border-b border-border overflow-x-auto overflow-y-hidden">
        <Tabs {...framer.tabProps} />
      </div>
      <AnimatePresence mode="wait">
        <TabContent tab={framer.selectedTab} />
      </AnimatePresence>
    </div>
  )
}
