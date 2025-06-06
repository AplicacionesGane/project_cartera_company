import { LineChart, TooltipProps } from '../components/ui/ChartUtils'
import { CarteraDataXHoraI } from '../types/interface'
import { cx } from '../lib/utils'

interface Issue {
  status: 'VLR_CA' | 'VLR_CI' | 'VLR_CT'
  value: number
  percentage: number
}

const valueFormatter = (number: number) => {
  return Intl.NumberFormat('us').format(number).toString()
}

const status = {
  VLR_CA: 'bg-blue-500 dark:bg-blue-500',
  VLR_CI: 'bg-cyan-500 dark:bg-cyan-500',
  VLR_CT: 'bg-violet-500 dark:bg-violet-500'
}

const Tooltip = ({ payload, active, label }: TooltipProps) => {
  if (!active || !payload || payload.length === 0) return null

  const data = payload.map((item) => ({
    status: item.category as Issue['status'],
    value: item.value,
    percentage: (
      (item.value /
        (item.payload.VLR_CA +
          item.payload.VLR_CI +
          item.payload.VLR_CT)) *
      100
    ).toFixed(2)
  }))

  return (
    <>
      <div className='w-60 rounded-md border border-gray-500/10 bg-blue-500 px-4 py-1.5 text-sm shadow-md dark:border-gray-400/20 dark:bg-gray-900'>
        <p className='flex items-center justify-between'>
          <span className='text-gray-50 dark:text-gray-50'>Date</span>
          <span className='font-medium text-gray-50 dark:text-gray-50'>
            {label}
          </span>
        </p>
      </div>
      <div className='mt-1 w-60 space-y-1 rounded-md border border-gray-500/10 bg-white px-4 py-2 text-sm shadow-md dark:border-gray-400/20 dark:bg-gray-900'>
        {data.map((item, index) => (
          <div key={index} className='flex items-center space-x-2.5'>
            <span
              className={cx(
                status[item.status],
                'size-2.5 shrink-0 rounded-xs'
              )}
              aria-hidden={true}
            />
            <div className='flex w-full justify-between'>
              <span className='text-gray-700 dark:text-gray-300'>
                {item.status}
              </span>
              <div className='flex items-center space-x-1'>
                <span className='font-medium text-gray-900 dark:text-gray-50'>
                  {item.value}
                </span>
                <span className='text-gray-500 dark:text-gray-500'>
                  ({item.percentage}&#37;)
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

interface LineChart4Props {
  dataCartera?: CarteraDataXHoraI[]
  empresa?: string
  total?: number
}

export function LineChart4 ({ dataCartera, empresa, total }:LineChart4Props) {
  // Transform the dataCartera array to the format expected by LineChart
  const formattedData = dataCartera?.map(item => ({
    date: item.HORA,
    VLR_CA: item.VLR_CA,
    VLR_CI: item.VLR_CI,
    VLR_CT: item.VLR_CT
  })) || []

  return (
    <div className='w-full'>
      <header>
        <div className='flex items-center mb-6'>
          <div className='w-1 h-8 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full mr-4' />
          <h2 className='text-xl font-semibold text-slate-800 dark:text-white'>
            {empresa} ({total} registros)
          </h2>
        </div>
      </header>
      <LineChart
        className='h-80'
        data={formattedData}
        index='date'
        categories={['VLR_CA', 'VLR_CI', 'VLR_CT']}
        colors={['blue', 'cyan', 'violet']}
        valueFormatter={valueFormatter}
        yAxisWidth={100}
        showLegend={false}
        customTooltip={Tooltip}
      />
    </div>
  )
}
