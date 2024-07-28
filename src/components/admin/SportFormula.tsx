import { Box } from '@mui/material';
import * as babelPlugin from "prettier/parser-babel";
import * as prettierPluginEstree from "prettier/plugins/estree";
import { format } from "prettier/standalone";
import React, { useEffect } from 'react';
import HighlightElement from 'react-highlight';
import 'highlight.js/styles/atom-one-dark.css';

import { SportDto } from '../../services/core-admin/interfaces/SportDto';

interface SportFormulaProps {
  sport: SportDto;
}

const prettify = (text: string): Promise<string> => {
  return format(text, {
    plugins: [babelPlugin, prettierPluginEstree],
    parser: "babel",
    printWidth: 120,
    singleAttributePerLine: false,
    arrowParens: "always",
  });
}

const SportFormula: React.FC<SportFormulaProps> = ({ sport }) => {
  const [formattedFormula, setFormattedFormula] = React.useState<string | undefined>(undefined);

  useEffect(() => {
    const formatFormula = async () => {
      const formula = await prettify(sport.formula);
      setFormattedFormula(formula);
    };

    if (sport.formula) {
      formatFormula();
    }
  }, [sport.formula]);

  return (<Box>
    <HighlightElement className="javascript">
      {formattedFormula}
    </HighlightElement>
  </Box>);
};

export default SportFormula;
