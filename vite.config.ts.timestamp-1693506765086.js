// vite.config.ts
import { defineConfig } from "vite";
import { crx } from "@crxjs/vite-plugin";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";
import sveltePreprocess from "svelte-preprocess";
import zipPack from "vite-plugin-zip-pack";

// src/manifest.ts
import { defineManifest } from "@crxjs/vite-plugin";
var manifest_default = defineManifest({
  name: "create-chrome-ext",
  description: "",
  version: "0.0.0",
  manifest_version: 3,
  icons: {
    "16": "img/logo-16.png",
    "32": "img/logo-34.png",
    "48": "img/logo-48.png",
    "128": "img/logo-128.png"
  },
  action: {
    default_popup: "popup.html",
    default_icon: "img/logo-48.png"
  },
  options_page: "options.html",
  background: {
    service_worker: "src/background/index.ts",
    type: "module"
  },
  content_scripts: [
    {
      matches: ["http://*/*", "https://*/*"],
      js: ["src/content/index.ts"]
    }
  ],
  web_accessible_resources: [
    {
      resources: ["img/logo-16.png", "img/logo-34.png", "img/logo-48.png", "img/logo-128.png"],
      matches: []
    }
  ],
  permissions: []
});

// vite.config.ts
var vite_config_default = defineConfig(({ mode }) => {
  const production = mode === "production";
  return {
    build: {
      emptyOutDir: true,
      outDir: "build",
      rollupOptions: {
        output: {
          chunkFileNames: "assets/chunk-[hash].js"
        }
      }
    },
    plugins: [
      crx({ manifest: manifest_default }),
      svelte({
        compilerOptions: {
          dev: !production
        },
        preprocess: sveltePreprocess()
      }),
      zipPack({
        outDir: `package`,
        inDir: "build",
        outFileName: `${manifest_default.short_name ?? manifest_default.name.replaceAll(" ", "-")}-extension-v${manifest_default.version}.zip`
      })
    ],
    resolve: {
      alias: {
        "@": path.resolve("/home/synonym/Projects/ChatGPTSearchDialog", "src")
      }
    }
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL21hbmlmZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHsgY3J4IH0gZnJvbSAnQGNyeGpzL3ZpdGUtcGx1Z2luJ1xuaW1wb3J0IHsgc3ZlbHRlIH0gZnJvbSAnQHN2ZWx0ZWpzL3ZpdGUtcGx1Z2luLXN2ZWx0ZSdcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnXG5pbXBvcnQgc3ZlbHRlUHJlcHJvY2VzcyBmcm9tICdzdmVsdGUtcHJlcHJvY2VzcydcbmltcG9ydCB6aXBQYWNrIGZyb20gJ3ZpdGUtcGx1Z2luLXppcC1wYWNrJztcbmltcG9ydCBtYW5pZmVzdCBmcm9tICcuL3NyYy9tYW5pZmVzdCdcblxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICBjb25zdCBwcm9kdWN0aW9uID0gbW9kZSA9PT0gJ3Byb2R1Y3Rpb24nXG5cbiAgcmV0dXJuIHtcbiAgICBidWlsZDoge1xuICAgICAgZW1wdHlPdXREaXI6IHRydWUsXG4gICAgICBvdXREaXI6ICdidWlsZCcsXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIG91dHB1dDoge1xuICAgICAgICAgIGNodW5rRmlsZU5hbWVzOiAnYXNzZXRzL2NodW5rLVtoYXNoXS5qcycsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgcGx1Z2luczogW1xuICAgICAgY3J4KHsgbWFuaWZlc3QgfSksXG4gICAgICBzdmVsdGUoe1xuICAgICAgICBjb21waWxlck9wdGlvbnM6IHtcbiAgICAgICAgICBkZXY6ICFwcm9kdWN0aW9uLFxuICAgICAgICB9LFxuICAgICAgICBwcmVwcm9jZXNzOiBzdmVsdGVQcmVwcm9jZXNzKCksXG4gICAgICB9KSxcbiAgICAgIHppcFBhY2soe1xuICAgICAgICBvdXREaXI6IGBwYWNrYWdlYCxcbiAgICAgICAgaW5EaXI6ICdidWlsZCcsXG4gICAgICAgIC8vIEB0cy1pZ25vcmVcbiAgICAgICAgb3V0RmlsZU5hbWU6IGAke21hbmlmZXN0LnNob3J0X25hbWUgPz8gbWFuaWZlc3QubmFtZS5yZXBsYWNlQWxsKFwiIFwiLCBcIi1cIil9LWV4dGVuc2lvbi12JHttYW5pZmVzdC52ZXJzaW9ufS56aXBgLFxuICAgICAgfSksXG4gICAgXSxcbiAgICByZXNvbHZlOiB7XG4gICAgICBhbGlhczoge1xuICAgICAgICAnQCc6IHBhdGgucmVzb2x2ZShcIi9ob21lL3N5bm9ueW0vUHJvamVjdHMvQ2hhdEdQVFNlYXJjaERpYWxvZ1wiLCAnc3JjJyksXG4gICAgICB9LFxuICAgIH0sXG4gIH1cbn0pXG4iLCAiaW1wb3J0IHsgZGVmaW5lTWFuaWZlc3QgfSBmcm9tICdAY3J4anMvdml0ZS1wbHVnaW4nXG5cbmV4cG9ydCBkZWZhdWx0IGRlZmluZU1hbmlmZXN0KHtcbiAgbmFtZTogJ2NyZWF0ZS1jaHJvbWUtZXh0JyxcbiAgZGVzY3JpcHRpb246ICcnLFxuICB2ZXJzaW9uOiAnMC4wLjAnLFxuICBtYW5pZmVzdF92ZXJzaW9uOiAzLFxuICBpY29uczoge1xuICAgICcxNic6ICdpbWcvbG9nby0xNi5wbmcnLFxuICAgICczMic6ICdpbWcvbG9nby0zNC5wbmcnLFxuICAgICc0OCc6ICdpbWcvbG9nby00OC5wbmcnLFxuICAgICcxMjgnOiAnaW1nL2xvZ28tMTI4LnBuZycsXG4gIH0sXG4gIGFjdGlvbjoge1xuICAgIGRlZmF1bHRfcG9wdXA6ICdwb3B1cC5odG1sJyxcbiAgICBkZWZhdWx0X2ljb246ICdpbWcvbG9nby00OC5wbmcnLFxuICB9LFxuICBvcHRpb25zX3BhZ2U6ICdvcHRpb25zLmh0bWwnLFxuICBiYWNrZ3JvdW5kOiB7XG4gICAgc2VydmljZV93b3JrZXI6ICdzcmMvYmFja2dyb3VuZC9pbmRleC50cycsXG4gICAgdHlwZTogJ21vZHVsZScsXG4gIH0sXG4gIGNvbnRlbnRfc2NyaXB0czogW1xuICAgIHtcbiAgICAgIG1hdGNoZXM6IFsnaHR0cDovLyovKicsICdodHRwczovLyovKiddLFxuICAgICAganM6IFsnc3JjL2NvbnRlbnQvaW5kZXgudHMnXSxcbiAgICB9LFxuICBdLFxuICB3ZWJfYWNjZXNzaWJsZV9yZXNvdXJjZXM6IFtcbiAgICB7XG4gICAgICByZXNvdXJjZXM6IFsnaW1nL2xvZ28tMTYucG5nJywgJ2ltZy9sb2dvLTM0LnBuZycsICdpbWcvbG9nby00OC5wbmcnLCAnaW1nL2xvZ28tMTI4LnBuZyddLFxuICAgICAgbWF0Y2hlczogW10sXG4gICAgfSxcbiAgXSxcbiAgcGVybWlzc2lvbnM6IFtdLFxufSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBQSxTQUFTLG9CQUFvQjtBQUM3QixTQUFTLFdBQVc7QUFDcEIsU0FBUyxjQUFjO0FBQ3ZCLE9BQU8sVUFBVTtBQUNqQixPQUFPLHNCQUFzQjtBQUM3QixPQUFPLGFBQWE7OztBQ0xwQixTQUFTLHNCQUFzQjtBQUUvQixJQUFPLG1CQUFRLGVBQWU7QUFBQSxFQUM1QixNQUFNO0FBQUEsRUFDTixhQUFhO0FBQUEsRUFDYixTQUFTO0FBQUEsRUFDVCxrQkFBa0I7QUFBQSxFQUNsQixPQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixPQUFPO0FBQUEsRUFDVDtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ04sZUFBZTtBQUFBLElBQ2YsY0FBYztBQUFBLEVBQ2hCO0FBQUEsRUFDQSxjQUFjO0FBQUEsRUFDZCxZQUFZO0FBQUEsSUFDVixnQkFBZ0I7QUFBQSxJQUNoQixNQUFNO0FBQUEsRUFDUjtBQUFBLEVBQ0EsaUJBQWlCO0FBQUEsSUFDZjtBQUFBLE1BQ0UsU0FBUyxDQUFDLGNBQWMsYUFBYTtBQUFBLE1BQ3JDLElBQUksQ0FBQyxzQkFBc0I7QUFBQSxJQUM3QjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLDBCQUEwQjtBQUFBLElBQ3hCO0FBQUEsTUFDRSxXQUFXLENBQUMsbUJBQW1CLG1CQUFtQixtQkFBbUIsa0JBQWtCO0FBQUEsTUFDdkYsU0FBUyxDQUFDO0FBQUEsSUFDWjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGFBQWEsQ0FBQztBQUNoQixDQUFDOzs7QUQzQkQsSUFBTyxzQkFBUSxhQUFhLENBQUMsRUFBRSxLQUFLLE1BQU07QUFDeEMsUUFBTSxhQUFhLFNBQVM7QUFFNUIsU0FBTztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0wsYUFBYTtBQUFBLE1BQ2IsUUFBUTtBQUFBLE1BQ1IsZUFBZTtBQUFBLFFBQ2IsUUFBUTtBQUFBLFVBQ04sZ0JBQWdCO0FBQUEsUUFDbEI7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsSUFBSSxFQUFFLDJCQUFTLENBQUM7QUFBQSxNQUNoQixPQUFPO0FBQUEsUUFDTCxpQkFBaUI7QUFBQSxVQUNmLEtBQUssQ0FBQztBQUFBLFFBQ1I7QUFBQSxRQUNBLFlBQVksaUJBQWlCO0FBQUEsTUFDL0IsQ0FBQztBQUFBLE1BQ0QsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsT0FBTztBQUFBLFFBRVAsYUFBYSxHQUFHLGlCQUFTLGNBQWMsaUJBQVMsS0FBSyxXQUFXLEtBQUssR0FBRyxnQkFBZ0IsaUJBQVM7QUFBQSxNQUNuRyxDQUFDO0FBQUEsSUFDSDtBQUFBLElBQ0EsU0FBUztBQUFBLE1BQ1AsT0FBTztBQUFBLFFBQ0wsS0FBSyxLQUFLLFFBQVEsOENBQThDLEtBQUs7QUFBQSxNQUN2RTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
