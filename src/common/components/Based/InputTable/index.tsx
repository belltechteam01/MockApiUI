import * as React from 'react';
import { Box, Checkbox, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import classNames from 'classnames';
import { useTranslation } from 'react-i18next';
import CloseIcon from '@mui/icons-material/Close';

import { Input } from '../../../styled';
import { EnhancedTableProps, IInputTableProps } from './InputTable.types';

import styles from './styles.module.scss';

const EnhancedTableHead = (props: EnhancedTableProps) => {
  // const { t } = useTranslation();
  const { headCells } = props;

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox"></TableCell>
        {headCells.map((headCell) => (
          <TableCell key={headCell.name} align={headCell.numeric ? 'right' : 'left'} padding={headCell.disablePadding ? 'none' : 'normal'}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
};

export const InputTable = (props: IInputTableProps) => {
  const { t } = useTranslation();
  const { headCells, tableData, isBasic = false, onChange, onRowDelete } = props;

  const [headNames, setHeadNames] = React.useState<string[]>([]);
  const [rows, setRows] = React.useState<any[]>([]);
  const [selected] = React.useState<readonly string[]>([]);
  const [showDeleteId, setShowDeleteId] = React.useState(-1);

  React.useEffect(() => {
    if (!tableData || tableData.length === 0) setRows([]);
    else setRows(tableData);
  }, [tableData]);

  React.useEffect(() => {
    const heads = headCells.map((headCell) => headCell.name);
    setHeadNames(heads);
  }, [headCells]);

  const isSelected = (name: string) => selected.indexOf(name) !== -1;

  const handleChange = (newValue: any, cellName: string, index: number) => {
    if (onChange) onChange(newValue, cellName, index);
  };

  const handleDelete = (index: number) => {
    setShowDeleteId(-1);
    if (onRowDelete) onRowDelete(index);
  };

  const renderTableCells = (row: any, index: number, headName: string, idx: any, labelId: string | undefined, isBasic: boolean) => {
    if (isBasic) {
      return (
        <TableCell component="th" id={labelId} scope="row" padding="normal" key={`${headName}-${index}`}>
          {row[headName]}
        </TableCell>
      );
    } else if (index === showDeleteId && rows.length - 1 > index) {
      return (
        <TableCell
          component="th"
          classes={{
            root: classNames(styles.cellRoot, {
              [styles.checkCell]: !!headCells[idx].checkable
            })
          }}
          sx={{ position: 'relative' }}
          id={labelId}
          scope="row"
          padding="none"
          key={`${headName}-${index}`}
        >
          {rows.length - 1 > index && !isBasic && !!headCells[idx].checkable && (
            <Checkbox
              color="primary"
              checked={row[headName]}
              inputProps={{
                'aria-labelledby': labelId
              }}
              onChange={(e: any) => handleChange(e.target.checked, headName, index)}
            />
          )}
          {!headCells[idx].checkable && (
            <Input
              id={`${headName}-${index}`}
              aria-describedby="key-helper-text"
              placeholder={t(`apiTest.form.setting.request.placeholder.${headName}`)}
              value={row[headName]}
              onChange={(e: any) => handleChange(e.target.value, headName, index)}
            />
          )}
          {headNames.length - 1 === idx && (
            <IconButton
              sx={{
                width: 16,
                height: 16,
                position: 'absolute',
                right: 5,
                top: 14,
                zIndex: 9999
              }}
              aria-label="add an alarm"
              onClick={() => handleDelete(index)}
            >
              <CloseIcon />
            </IconButton>
          )}
        </TableCell>
      );
    } else {
      return (
        <TableCell
          component="th"
          classes={{
            root: classNames(styles.cellRoot, {
              [styles.checkCell]: !!headCells[idx].checkable
            })
          }}
          id={labelId}
          scope="row"
          padding="none"
          key={`${headName}-${index}`}
        >
          {rows.length - 1 > index && !isBasic && !!headCells[idx].checkable && (
            <Checkbox
              color="primary"
              checked={row[headName]}
              inputProps={{
                'aria-labelledby': labelId
              }}
              onChange={(e: any) => handleChange(e.target.checked, headName, index)}
            />
          )}
          {!headCells[idx].checkable && (
            <Input
              id={`${headName}-${index}`}
              aria-describedby="key-helper-text"
              placeholder={t(`apiTest.form.setting.request.placeholder.${headName}`)}
              value={row[headName]}
              onChange={(e: any) => handleChange(e.target.value, headName, index)}
            />
          )}
        </TableCell>
      );
    }
  };

  // Avoid a layout jump when reaching the last page with empty rows.

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }} aria-labelledby="tableTitle" size="small">
            <EnhancedTableHead headCells={headCells} />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
              rows.slice().sort(getComparator(order, orderBy)) */}
              {rows.map((row, index) => {
                const isItemSelected = isSelected(row.key);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={`row-${index}`}
                    selected={row.isChecked}
                    onMouseEnter={() => {
                      setShowDeleteId(index); // set id here
                    }}
                    onMouseLeave={() => setShowDeleteId(-1)}
                  >
                    <TableCell padding="checkbox">
                      {rows.length - 1 > index && !isBasic && row.hasOwnProperty('isChecked') && (
                        <Checkbox
                          color="primary"
                          checked={row.isChecked}
                          inputProps={{
                            'aria-labelledby': labelId
                          }}
                          onChange={(e: any) => handleChange(e.target.checked, 'isChecked', index)}
                        />
                      )}
                    </TableCell>
                    {headNames.map((headName, idx) => renderTableCells(row, index, headName, idx, labelId, isBasic))}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};
