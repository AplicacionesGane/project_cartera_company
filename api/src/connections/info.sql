# TODO: DECRIBE DE CARTERA
+-----------------+-------------+------+-----+---------+-------+
| Field           | Type        | Null | Key | Default | Extra |
+-----------------+-------------+------+-----+---------+-------+
| EMPRESA         | varchar(10) | NO   | PRI | NULL    |       |
| CUENTA          | varchar(10) | NO   | PRI | NULL    |       |
| VINCULADO       | varchar(20) | NO   | PRI | NULL    |       |
| FECHA           | date        | NO   | PRI | NULL    |       |
| BASE            | int         | YES  |     | 0       |       |
| RASPAS          | int         | YES  |     | 0       |       |
| EXCP2           | int         | YES  |     | 0       |       |
| EXCP3           | int         | YES  |     | 0       |       |
| SALDO_ANT       | int         | YES  |     | 0       |       |
| DEBITO          | int         | YES  |     | 0       |       |
| CREDITO         | int         | YES  |     | 0       |       |
| NUEVOSALDO      | int         | YES  |     | 0       |       |
| VTABNET         | int         | YES  |     | 0       |       |
| VTASIISS        | int         | YES  |     | 0       |       |
| VTASFLEX        | int         | YES  |     | 0       |       |
| VTA_S1          | int         | YES  |     | 0       |       |
| VTA_S2          | int         | YES  |     | 0       |       |
| VTA_S3          | int         | YES  |     | 0       |       |
| RECHAZADOS      | int         | YES  |     | 0       |       |
| ACEPTADOS       | int         | YES  |     | 0       |       |
| DIGITADOS       | int         | YES  |     | 0       |       |
| OBSERVACION1    | varchar(30) | YES  |     | NULL    |       |
| OBSERVACION2    | varchar(30) | YES  |     | NULL    |       |
| OBSERVACION3    | varchar(30) | YES  |     | NULL    |       |
| VERSION         | varchar(20) | YES  |     | NULL    |       |
| PENDIENTES_CONT | int         | YES  |     | 0       |       |
+-----------------+-------------+------+-----+---------+-------+

# TODO: DECRIBE DE DETALLERECADUO
+-------------+---------------+------+-----+---------+-------+
| Field       | Type          | Null | Key | Default | Extra |
+-------------+---------------+------+-----+---------+-------+
| FECHA       | date          | NO   | PRI | NULL    |       |
| RECAUDADOR  | varchar(10)   | NO   | PRI | NULL    |       |
| ID_RECAUDO  | varchar(20)   | NO   | PRI | NULL    |       |
| CAJADNO     | varchar(10)   | NO   |     | NULL    |       |
| VINCULADO   | varchar(20)   | NO   |     | NULL    |       |
| VALOR       | int           | YES  |     | 0       |       |
| ESTADO      | varchar(5)    | NO   |     | NULL    |       |
| RESPALDO    | varchar(30)   | YES  |     | NULL    |       |
| HORASYNC    | time          | YES  |     | NULL    |       |
| HORAMOVI    | time          | YES  |     | NULL    |       |
| USR_CONTEO  | varchar(15)   | YES  |     | NULL    |       |
| HORA_CONTEO | time          | YES  |     | NULL    |       |
| NOTA_CONTEO | varchar(1000) | YES  |     | NULL    |       |
| VERSION     | varchar(20)   | YES  |     | NULL    |       |
| EMPRESA     | varchar(10)   | YES  |     | NULL    |       |
+-------------+---------------+------+-----+---------+-------+

# TODO: DESCRIBE DE AUDBASE;
+-------------+-------------+------+-----+-------------------+-------------------+
| Field       | Type        | Null | Key | Default           | Extra             |
+-------------+-------------+------+-----+-------------------+-------------------+
| FECHA       | timestamp   | YES  |     | CURRENT_TIMESTAMP | DEFAULT_GENERATED |
| VINCULADO   | varchar(20) | NO   | MUL | NULL              |                   |
| BASE_ANT    | int         | YES  |     | 0                 |                   |
| BASE_NEW    | int         | YES  |     | 0                 |                   |
| RASPE_ANT   | int         | YES  |     | 0                 |                   |
| RASPE_NEW   | int         | YES  |     | 0                 |                   |
| EXCP2_ANT   | int         | YES  |     | 0                 |                   |
| EXCP2_NEW   | int         | YES  |     | 0                 |                   |
| EXCP3_ANT   | int         | YES  |     | 0                 |                   |
| EXCP3_NEW   | int         | YES  |     | 0                 |                   |
| LOGIN       | varchar(20) | YES  |     | NULL              |                   |
| OBSERVACION | varchar(30) | YES  |     | NULL              |                   |
| VERSION     | varchar(20) | YES  |     | NULL              |                   |
+-------------+-------------+------+-----+-------------------+-------------------+
