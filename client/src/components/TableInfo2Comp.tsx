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
                                <TableCell>{formatValue(item.CAJERO_COMERCIAL)}</TableCell>
                                <TableCell>{formatValue(item.COLOCADOR_INDEPENDIENTE)}</TableCell>
                                <TableCell>{formatValue(item.CAJERO_TESORERIA || 0)}</TableCell>
                                <TableCell>{formatValue(item.VENDEDOR || 0)}</TableCell>
                                <TableCell>{formatValue(item.NO_DEFINIDO || 0)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableRoot>

        </div>
    )
}