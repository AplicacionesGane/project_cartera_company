import { DataIU } from '../types/interface'
import { formatValue } from '../utils/funtions'
import { TableRoot, Table, TableBody, TableCell, TableHead, TableHeaderCell, TableRow} from './ui'

export function TableInfo2Comp({ data }: { data: DataIU[] }) {
    return (
        <div className='flex w-full items-center justify-center'>
            <TableRoot>
                <Table>
                    <TableHead className='bg-blue-600'>
                        <TableRow>
                            <TableHeaderCell className='text-white'>Empresa</TableHeaderCell>
                            <TableHeaderCell className='text-white'>Caj Comercial</TableHeaderCell>
                            <TableHeaderCell className='text-white'>Col Independiente</TableHeaderCell>
                            <TableHeaderCell className='text-white'>Caj Tesorería</TableHeaderCell>
                            <TableHeaderCell className='text-white'>Vendedor</TableHeaderCell>
                            <TableHeaderCell className='text-white'>No definido</TableHeaderCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((item, index) => (
                            <TableRow key={index}>
                                <TableCell>{item.Empresa}</TableCell>
                                <TableCell>{formatValue(item.Caj_Comercial)}</TableCell>
                                <TableCell>{formatValue(item.Colo_Independiente)}</TableCell>
                                <TableCell>{formatValue(item.Caj_Tesoreria || 0)}</TableCell>
                                <TableCell>{formatValue(item.Vendedor || 0)}</TableCell>
                                <TableCell>{formatValue(item.No_Definido || 0)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableRoot>

        </div>
    )
}