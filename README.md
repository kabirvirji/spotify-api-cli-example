# spotify-api-cli-example
Example of a spotify cli and api interaction

# How does it work?
```
                                                                                         
                                                                                         
                                              3) Refreshes token on                      
                                                   an interval                           
                                                                                         
                                                        .─.                              
                                                       ;   :                             
                                                       :   ;                             
                                                        ╲ ╱                              
                                               ┌─────────'───────────┐                   
                       1.2) Makes Auth         │                     │                   
                 ┌──  callback to micro   ────▶│    Micro server     │◀──────────┐       
                 │    server with tokens       │                     │           │       
                 │                             └─────────────────────┘                   
                 │                                        ▲       │         4) Check if  
                 │                                                          tokens are   
                 │                                        │       │         expired and  
                 │                    1.1) Make request to micro           request from  
                 │                    server to check status of   │        server if so  
                 │                        initial token and                              
      ┌─────────────────────┐             continuously fetch      │              │       
      │                     │                                                    │       
      │       SPOTIFY       │◀─ ─ ─ ─ ─ ─ ┐               │       │              │       
      │                     │                                                    │       
      └─────────────────────┘             │           ─ ─ ┘       └ ─ ─ ─ ─      │       
                                                     │                     │     │       
                                          │                    2) Returns with   │       
                                                     │           token from      │       
                             1) Open spotify                    micro server     │       
                              authorize page         │                     │     │       
                                                                                 │       
                                                     │                     │     │       
                                          │                                      │       
                                                     │                     │     │       
                                          │                                ▼     │       
                                                     │  ┌─────────────────────┐  │       
                                          │             │                     │  │       
                                           ─ ─ ─ ─ ─ ┴ ─│         CLI         │──┘       
                                                        │                     │          
                                                        └─────────────────────┘          
```
