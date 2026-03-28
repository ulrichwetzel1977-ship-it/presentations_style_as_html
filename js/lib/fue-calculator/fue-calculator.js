/**
 * MODULE: FUE-CALCULATOR
 * Umfasst FUE-Mapping, TCO-Vergleich und ROI-Logik.
 */

const FUECalculator = {
    RATIOS: { professional: 1, functional: 0.2, productivity: 0.0333 },

    calculateFUE: function(p, f, pr) {
        return Math.ceil((p * this.RATIOS.professional) + (f * this.RATIOS.functional) + (pr * this.RATIOS.productivity));
    },

    // Die NPV-Berechnung für den TCO-Vergleich
    calculateNPV: function(rate, cashflows) {
        return cashflows.reduce((npv, cf, t) => npv + (cf / Math.pow(1 + rate, t)), 0);
    },

    // Generiert die Daten für den On-Premise vs. RISE Vergleich
    getComparison: function(data) {
        const rate = data.wacc / 100;
        let cfOnPrem = [data.onPremCapex];
        let cfRise = [data.riseCapex];

        for (let i = 1; i <= data.horizon; i++) {
            cfOnPrem.push(data.onPremOpex);
            cfRise.push(data.annualRiseSub);
        }

        const npvOnPrem = this.calculateNPV(rate, cfOnPrem);
        const npvRise = this.calculateNPV(rate, cfRise);

        return {
            npvOnPrem,
            npvRise,
            savings: npvOnPrem - npvRise,
            roi: ((data.annualBenefits * data.horizon) / data.riseCapex) * 100
        };
    }
};