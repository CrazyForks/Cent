import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig, type PluginOption } from "vite";
import { analyzer } from "vite-bundle-analyzer";
import { VitePWA } from "vite-plugin-pwa";

const packageJSON = readFileSync("./package.json", { encoding: "utf-8" });
const packageValue = JSON.parse(packageJSON);

const shouldAnalyze = process.env.ANALYZE === "true";

const plugins: PluginOption[] = [
    react(),
    tailwindcss(),
    VitePWA({
        strategies: "injectManifest",
        srcDir: "src",
        filename: "sw.ts",
        registerType: "autoUpdate",
        injectRegister: "auto",
        includeAssets: ["favicon.ico", "apple-touch-icon.png"],
        manifest: {
            name: "Cent - 日计",
            short_name: "Cent",
            description: "Accounting your life - 记录每一天",
            theme_color: "#ffffff",
            icons: [
                { src: "icon.png", sizes: "192x192", type: "image/png" },
                { src: "icon.png", sizes: "512x512", type: "image/png" },
            ],
        },
    }),
];

if (shouldAnalyze) {
    // 只有在环境变量 ANALYZE=true 时才添加分析插件
    plugins.push(analyzer());
}

// https://vite.dev/config/
export default defineConfig({
    define: {
        __BUILD_INFO: { version: `${packageValue.version}` },
    },
    plugins,
    resolve: {
        alias: {
            "@": resolve("./src"),
        },
    },
});
