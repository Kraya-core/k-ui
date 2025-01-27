import { IDocumentTaxesInput, TAX_NAME, TAX_TYPE } from "kcommons/build";
import { ITaxRelatedItemInputs } from "kcommons/build/typings/docItems.typings";
import React, { useMemo } from "react";

interface ITaxCalculatorProps<K> {
  subtotal: number;
  values: K;
}

function useTaxCalculator<
  K extends { taxes: IDocumentTaxesInput[]; items: ITaxRelatedItemInputs[] }
>({
  subtotal,
  values,
}: ITaxCalculatorProps<K>): Record<TAX_NAME, number | null> {
  const pnfTaxData = values.taxes.find((ele) => ele.tax_name === TAX_NAME.PNF);
  const frieghtTax = values.taxes.find(
    (ele) => ele.tax_name === TAX_NAME.FREIGHT
  );
  const insuranceTax = values.taxes.find(
    (ele) => ele.tax_name === TAX_NAME.INSURANCE
  );
  const otherChargesTax = values.taxes.find(
    (ele) => ele.tax_name === TAX_NAME.OTHER_CHARGES
  );
  const gstTax = values.taxes.find((ele) => ele.tax_name === TAX_NAME.GST);
  const tcstax = values.taxes.find((ele) => ele.tax_name === TAX_NAME.TCS);
  const cessTax = values.taxes.find((ele) => ele.tax_name === TAX_NAME.CESS);
  const adjustment = values.taxes.find(
    (ele) => ele.tax_name === TAX_NAME.ADJUSTMENT
  );
  const items = values.items;

  const pnf = useMemo(() => {
    if (!pnfTaxData) return null;
    if (pnfTaxData?.tax_type === TAX_TYPE.FIXED) {
      return pnfTaxData.tax_value;
    } else {
      return subtotal * (pnfTaxData.tax_value / 100);
    }
  }, [subtotal, JSON.stringify(pnfTaxData)]);

  const freight = useMemo(() => {
    if (!frieghtTax) return null;
    if (frieghtTax?.tax_type === TAX_TYPE.FIXED) {
      return frieghtTax.tax_value;
    } else {
      return subtotal * (frieghtTax.tax_value / 100);
    }
  }, [subtotal, JSON.stringify(frieghtTax)]);

  const insurance = useMemo(() => {
    if (!insuranceTax) return null;
    if (insuranceTax?.tax_type === TAX_TYPE.FIXED) {
      return insuranceTax.tax_value;
    } else {
      return (
        (subtotal + (freight || 0) + (pnf || 0)) *
        (insuranceTax.tax_value / 100)
      );
    }
  }, [subtotal, JSON.stringify(insuranceTax)]);

  const otherCharges = useMemo(() => {
    if (!otherChargesTax) return null;
    if (otherChargesTax?.tax_type === TAX_TYPE.FIXED) {
      return otherChargesTax.tax_value;
    } else {
      return null;
    }
  }, [subtotal, JSON.stringify(otherChargesTax)]);

  const gst = useMemo(() => {
    if (!gstTax) return null;
    if (gstTax?.tax_type === TAX_TYPE.FIXED) {
      return null;
    } else {
      let hightestGstValue = 0;
      for (const item of items) {
        if (item.gst && item.gst > hightestGstValue)
          hightestGstValue = item.gst;
      }
      const itemsTaxTotal = items.reduce((prev, curr) => {
        if (!curr.provided_quantity || !curr.gst || !curr.per_unit_rate)
          return prev;
        let itemTaxableVal = curr.provided_quantity * curr.per_unit_rate;
        if (curr.discount_value) {
          if (curr.discount_type === TAX_TYPE.FIXED)
            itemTaxableVal =
              curr.provided_quantity *
              (curr.per_unit_rate - curr.discount_value);
          if (curr.discount_type === TAX_TYPE.PERCENTAGE)
            itemTaxableVal =
              itemTaxableVal - (itemTaxableVal * curr.discount_value) / 100;
        }
        const tax = itemTaxableVal * (curr.gst / 100);
        return prev + tax;
      }, 0);

      const taxTableTotal =
        ((pnf || 0) + (freight || 0) + (insurance || 0) + (otherCharges || 0)) *
        (hightestGstValue / 100);

      return itemsTaxTotal + taxTableTotal;
    }
  }, [
    subtotal,
    JSON.stringify(gstTax),
    JSON.stringify(items),
    pnf,
    freight,
    insurance,
    otherCharges,
  ]);

  const tcs = useMemo(() => {
    if (!tcstax) return null;
    if (tcstax?.tax_type === TAX_TYPE.FIXED) {
      return tcstax.tax_value;
    } else {
      return (
        ((pnf || 0) +
          (freight || 0) +
          (insurance || 0) +
          (otherCharges || 0) +
          (gst || 0)) *
        (tcstax.tax_value / 100)
      );
    }
  }, [
    subtotal,
    JSON.stringify(tcstax),
    pnf,
    freight,
    insurance,
    otherCharges,
    gst,
  ]);

  const cessCharges = useMemo(() => {
    if (!cessTax) return null;
    if (cessTax?.tax_type === TAX_TYPE.FIXED) {
      return cessTax.tax_value;
    } else {
      return (gst || 0) * (cessTax.tax_value / 100);
    }
  }, [subtotal, JSON.stringify(cessTax), gst]);

  const adjustmentCharges = useMemo(() => {
    if (!adjustment) return null;
    if (adjustment?.tax_type === TAX_TYPE.FIXED) {
      return adjustment.tax_value;
    } else {
      return null;
    }
  }, [JSON.stringify(adjustment)]);

  return {
    [TAX_NAME.PNF]: pnf,
    [TAX_NAME.FREIGHT]: freight,
    [TAX_NAME.INSURANCE]: insurance,
    [TAX_NAME.OTHER_CHARGES]: otherCharges,
    [TAX_NAME.GST]: gst,
    [TAX_NAME.TCS]: tcs,
    [TAX_NAME.CESS]: cessCharges,
    [TAX_NAME.ADJUSTMENT]: adjustmentCharges,
  };
}

export default useTaxCalculator;
