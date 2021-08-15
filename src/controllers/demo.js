const _code = `main()
                {
                   ios_base::sync_with_stdio(0), cin.tie(0), cout.tie(0);
                   #ifndef ONLINE_JUDGE
                     freopen("${inputFile.replace(/\\/g,"\\\\")}", "r", stdin);
                   #endif
                `
                var codes = ""
                        if(code.includes('main(){'))
                        {
                          codes = code.replace(`main(){`,_code)
                         
                        }
                        if(code.includes('main() {'))
                        {
                          codes = code.replace(`main() {`,_code)
                         
                        }
                        if(code.includes(`
                        main()
                        {
                            `))
                        {
                          codes = code.replace(`
                          main()
                          {`,_code)
                         
                        }