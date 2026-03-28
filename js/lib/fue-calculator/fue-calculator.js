/**
 * MODULE: SAP FUE & TCO/ROI ANALYZER (PRO-VERSION)
 * Kombiniert Nutzer-Sizing, Abo-Kosten und Business Case Kalkulation.
 */

const FueTcoModule = {
    state: {
        wacc: 8.0,
        horizon: 5,
        discount: 20,
        fuePrice: 175,
        onPremCapex: 1200000,
        onPremOpex: 850000,
        riseCapex: 1800000,
        roiFactors: [
            { id: 1, name: 'IT-Infrastruktur Einsparung', value: 120000 },
            { id: 2, name: 'Basis Admin Effizienz', value: 95000 },
            { id: 3, name: 'Business Agilität / Time-to-Market', value: 150000 }
        ],
        fue: { adv: 50, core: 100, self: 300, dev: 5 }
    },
    chart: null,

    init: function() {
        this.calculateAll();
        this.setupListeners();
    },

    setupListeners: function() {
        const ids = ['inp-adv', 'inp-core', 'inp-self', 'inp-dev', 'inp-wacc', 'inp-horizon', 'inp-discount', 'inp-fue-price', 'inp-onprem-capex', 'inp-rise-capex', 'inp-onprem-opex'];
        ids.forEach(id => {
            const el = document.getElementById(id);
            if (el) el.addEventListener('input', () => this.calculateAll());
        });
    },

    calculateAll: function() {
        // 1. FUE Sizing (Ratios: 1:1, 1:5, 1:30, Dev 2:1)
        const gv = (id) => parseFloat(document.getElementById(id)?.value || 0);
        const totalFue = Math.ceil(gv('inp-adv') * 1 + gv('inp-core') * 0.2 + gv('inp-self') * 0.033 + gv('inp-dev') * 2);
        
        // 2. Abo-Kosten (Netto/Jahr)
        const monthlyNet = (totalFue * gv('inp-fue-price')) * (1 - (gv('inp-discount') / 100));
        const annualRiseSub = monthlyNet * 12;

        // 3. TCO & NPV (Barwert)
        const years = parseInt(document.getElementById('inp-horizon')?.value || 5);
        const wacc = gv('inp-wacc') / 100;
        const annualBenefit = this.state.roiFactors.reduce((sum, f) => sum + f.value, 0);

        let npvOnPrem = gv('inp-onprem-capex');
        let npvRise = gv('inp-rise-capex');
        
        const labels = ['Jahr 0'];
        const dataOnPrem = [npvOnPrem];
        const dataRise = [npvRise];

        for (let i = 1; i <= years; i++) {
            const factor = Math.pow(1 + wacc, i);
            npvOnPrem += gv('inp-onprem-opex') / factor;
            npvRise += annualRiseSub / factor;
            
            labels.push(`Jahr ${i}`);
            dataOnPrem.push(npvOnPrem);
            dataRise.push(npvRise);
        }

        // 4. ROI & Payback
        const netBenefit = (npvOnPrem - npvRise) + (annualBenefit * years); // Vereinfacht
        const roi = (netBenefit / gv('inp-rise-capex')) * 100;

        this.updateUI({
            fue: totalFue,
            onPrem: npvOnPrem,
            rise: npvRise,
            roi: roi,
            annualBenefit: annualBenefit,
            chartData: { labels, dataOnPrem, dataRise }
        });
    },

    updateUI: function(results) {
        const setTxt = (id, val) => { if(document.getElementById(id)) document.getElementById(id).innerText = val; };
        const fmt = (val) => new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 }).format(val);

        setTxt('out-fue-total', results.fue);
        setTxt('out-tco-onprem', fmt(results.onPrem));
        setTxt('out-tco-rise', fmt(results.rise));
        setTxt('out-roi', results.roi.toFixed(0) + '%');
        setTxt('out-annual-value', fmt(results.annualBenefit));

        this.renderChart(results.chartData);
        this.updateTshirtSize(results.fue);
    },

    updateTshirtSize: function(fue) {
        const size = fue <= 135 ? 'XXS' : fue <= 550 ? 'XS' : fue <= 1000 ? 'S' : fue <= 2000 ? 'M' : 'L';
        document.querySelectorAll('.tshirt-row').forEach(row => row.classList.remove('active-tier'));
        const activeRow = document.getElementById('tier-' + size.toLowerCase());
        if(activeRow) activeRow.classList.add('active-tier');
    },

    renderChart: function(ctxData) {
        const canvas = document.getElementById('tcoChart');
        if (!canvas || !window.Chart) return;

        if (this.chart) this.chart.destroy();
        this.chart = new Chart(canvas, {
            type: 'line',
            data: {
                labels: ctxData.labels,
                datasets: [
                    { label: 'TCO On-Premise', data: ctxData.dataOnPrem, borderColor: '#86868b', fill: false, tension: 0.3 },
                    { label: 'TCO RISE with SAP', data: ctxData.dataRise, borderColor: '#0071e3', backgroundColor: 'rgba(0,113,227,0.1)', fill: true, tension: 0.3 }
                ]
            },
            options: { responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom' } } }
        });
    }
};