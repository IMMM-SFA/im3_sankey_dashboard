<script>
    import Papa from 'papaparse';
    import { onMount } from 'svelte';
	import { base } from '$app/paths';

    // the plotly javascript library appears to have some serious bugs when loaded
    // into a module context, so i moved the load back into <head> in app.html;
    // also just 'plotly' was a different library... :\
    // import Plotly from 'plotly.js-dist-min';

    // the dropdown is now built in a svelte-like way; see below
    const scenarios = [
        'rcp45cooler_ssp3', 'rcp45cooler_ssp5', 
        'rcp45hotter_ssp3', 'rcp45hotter_ssp5', 
        'rcp85cooler_ssp3', 'rcp85cooler_ssp5', 
        'rcp85hotter_ssp3', 'rcp85hotter_ssp5', 
    ];
    let selectedScenario = scenarios[4];

    // data is now fetched in a svelte-like way; see below
    let data;

    // Generate Sankey frames by year and scenario
    // this is the same as you had it
    function generateSankeyFrames(data, selectedScenario) {
        const filteredData = data.filter(row => row.scenario === selectedScenario);
        const years = [...new Set(filteredData.map(row => row.year))];
        const labels = new Set();
        const frames = [];

        filteredData.forEach(row => {
            labels.add(row.source);
            labels.add(row.target);
        });

        years.forEach(year => {
            const yearData = filteredData.filter(row => row.year === year);
            const sources = [];
            const targets = [];
            const values = [];
            const linkColors = [];
            const nodeColors = Array.from({ length: labels.size });

            yearData.forEach(row => {
                sources.push([...labels].indexOf(row.source));
                targets.push([...labels].indexOf(row.target));
                values.push(parseFloat(row.value));
                linkColors.push(row.link_color);
                nodeColors[[...labels].indexOf(row.source)] = row.source_color;
                nodeColors[[...labels].indexOf(row.target)] = row.target_color;
            });

            frames.push({
                name: year,
                data: [{
                    type: "sankey",
                    orientation: "h",
                    node: {
                        pad: 15,
                        thickness: 20,
                        line: { color: "black", width: 0.5 },
                        label: [...labels],
                        color: nodeColors
                    },
                    link: {
                        source: sources,
                        target: targets,
                        value: values,
                        color: linkColors
                    }
                }]
            });
        });

        return { frames, labels: [...labels] };
    }

    // Initialize Sankey animation
    // this is the same as you had it
    function initializeSankey(data, selectedScenario) {
        const { frames, labels } = generateSankeyFrames(data, selectedScenario);
        const initialFrame = frames[0];

        const layout = {
            title: "Water Sankey Diagram by Year",
            font: { size: 12 },
            sliders: [{
                steps: frames.map(frame => ({
                    method: "animate",
                    label: frame.name,
                    args: [[frame.name], { mode: "immediate", frame: { duration: 1000, redraw: true }, transition: { duration: 500 } }]
                })),
                active: 0,
                currentvalue: {
                    prefix: "Year: ",
                    font: { size: 16, color: "#666" }
                },
                pad: { t: 30 }
            }],
            updatemenus: [{
                type: "buttons",
                showactive: false,
                buttons: [
                    {
                        label: "Play",
                        method: "animate",
                        args: [null, { frame: { duration: 1000, redraw: true }, fromcurrent: true, mode: "immediate", transition: { duration: 500 } }]
                    },
                    {
                        label: "Pause",
                        method: "animate",
                        args: [[null], { mode: "immediate", frame: { duration: 0, redraw: false }, transition: { duration: 0 } }]
                    }
                ]
            }]
        };

        Plotly.newPlot("sankeyDiagram", initialFrame.data, layout)
            .then(() => {
                Plotly.addFrames("sankeyDiagram", frames);
            });
    }

    // when the page loads into a user's browser (onMount),
    // fetch the data and store in the the `data` variable defined above
    onMount(() => {
        fetch(`${base}/data.csv`).then(response => {
            if (!response.ok) throw new Error("Network response was not ok");
            return response.text();
        }).then(
            d => Papa.parse(d, { header: true }).data
        ).then(d => {
            // this is the modele scoped `data` variable defined above
            data = d;
        }).catch(
            error => console.error("Error loading CSV file:", error)
        );
    });

    // this is how to make a "reactive" construct in svelte, using the $: syntax
    // the code here will run anytime the referenced, in-scope variables change
    // (in this case, `data` and `selectedScenario`), but the "if" construct means
    // we only run initializeSankey if both `data` and `selectedScenario` are "truthy",
    // meaning they have any non-false, non-zero, non-empty string value;
    // there are many other ways to use "$:" too
    $: if (data && selectedScenario) {
        initializeSankey(data, selectedScenario);
    }

</script>

<!-- Svelte will always rerender the html when variables change reactively -->
<div id="sankeyWrapper">

    <!-- the `bind:value` svelte construct causes `selectedScenario` to always reflect the selected value -->
    <select
        id="scenarioSelector"
        bind:value={selectedScenario}
    >
        {#each scenarios as s}
            <option value={s}>{s}</option>
        {/each}
    </select>

    <!-- the Plotly looks for this id; this is non-svelte-like but we can do it anyway -->
    <div id="sankeyDiagram"></div>

</div>

<style>
    #sankeyWrapper {
        width: 100vw;
        height: 100vh;
        overflow-x: hidden;
        overflow-y: auto;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
    }
    #sankeyDiagram {
        width: 100%;
        max-width: 1200px;
        height: 800px;
    }
    #scenarioSelector {
        width: 256px;
    }
</style>