import { useEffect, useState } from 'react';

export const useLayers = () => {
    const [layers, setLayers] = useState([]);

    const addLayer = (layer) => {
        setLayers((prevLayers) => [...prevLayers, layer]);
    };

    const removeLayer = (layerId) => {
        setLayers((prevLayers) => prevLayers.filter(layer => layer.id !== layerId));
    };

    const clearLayers = () => {
        setLayers([]);
    };

    useEffect(() => {
        // Initialize layers if needed
        return () => {
            clearLayers(); // Cleanup on unmount
        };
    }, []);

    return { layers, addLayer, removeLayer, clearLayers };
};