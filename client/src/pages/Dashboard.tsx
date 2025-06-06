import { ResumenRecaudo } from '../components/ResumenRecaudo'
import { TableInfo2Comp } from '../components/TableInfo2Comp'
import { LineChart4 } from '../components/ComponentChart'
import { DataIU, RecaudoI } from '../types/interface'
import { TableInfo } from '../components/TableInfo'
import { useEffect, useState } from 'react'
import { API_URL } from '../utils/contanst'
import axios from 'axios'

function Dashboard() {
  const [data, setData] = useState<DataIU[]>([])
  const [recaudo, setRecaudo] = useState<RecaudoI>({ multired: [], servired: [] })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${API_URL}/resumenCartera`)
        setData(res.data)
      } catch (err) {
        console.error(err)
      }
    }

    const fetchRecaudo = async () => {
      try {
        const res = await axios.get(`${API_URL}/resumenRecaudo`)
        setRecaudo(res.data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchData()
    fetchRecaudo()

    const interval = setInterval(() => {
      fetchData()
      fetchRecaudo()
    }, 900000) // 15 minutes in milliseconds

    return () => clearInterval(interval)
  }, [])

  return (
    <>

      <section className='max-w-7xl mx-auto p-4'>
        <LineChart4 />
      </section>

      <section className='flex w-full gap-2'>
        <TableInfo data={data} />
      </section>

      <section className='flex w-full justify-around mt-4'>
        <TableInfo2Comp data={data} />
      </section>

      <section className='flex justify-around'>
        {
          <>
            <ResumenRecaudo datos={recaudo.multired} name='Multired' />
            <ResumenRecaudo datos={recaudo.servired} name='Servired' />
          </>
        }
      </section>

    </>
  )
}

export default Dashboard
