import { SpendingValidator } from 'lucid-cardano';
export const shittingPool: SpendingValidator = {
    type: 'PlutusV1',
    script:
        '5915fd5915fa0100003323322333222333222333222333222332233223322333222333222332232323232333333332222222232333222323333222232323322323232333222323233223232333332222233223322332233223322332222323223223232533530303330093333573466e1d4019200223048323232323333573466e1cd55cea801a400046664446660a800600400260546ae85400cc8c8c8cccd5cd19b875001480088c188c8cccd5cd19b8735573a6ea80052000206723504b3530663357389201035054310006749926357426aae79400c8cccd5cd19b875002480008c190dd71aba135573ca00846a0946a60ca66ae7124010350543100066499264984d55cea80089baa00135742a0046eb4d5d09aba25002235045353060335738921035054310006149926135744a00226aae7940044dd50009aba135573ca01046666ae68cdc3a803a40004609064646666ae68cdc39aab9d5001480008c8c13c004dd71aba135573ca00446a0886a60be66ae71241035054310006049926137540026ae84d55cf280491a8209a982e19ab9c4901035054310005d49926498cccd5cd19b8750044800881148cccd5cd19b8750054800081148d4104d4c170cd5ce249035054310005d49926498cccd5cd19b8735573aa004900011980619191919191919191919191999ab9a3370e6aae75402920002333333333301a335028232323333573466e1cd55cea80124000466040606e6ae854008c0b4d5d09aba2500223505035306b3357389201035054310006c49926135573ca00226ea8004d5d0a80519a8140149aba150093335502d75ca0586ae854020ccd540b5d728161aba1500733502804035742a00c66a05066aa096092eb4d5d0a8029919191999ab9a3370e6aae754009200023350223232323333573466e1cd55cea80124000466a05466a07eeb4d5d0a80118221aba135744a00446a0a86a60de66ae712401035054310007049926135573ca00226ea8004d5d0a8011919191999ab9a3370e6aae7540092000233502833503f75a6ae854008c110d5d09aba2500223505435306f3357389201035054310007049926135573ca00226ea8004d5d09aba2500223505035306b3357389201035054310006c49926135573ca00226ea8004d5d0a80219a8143ae35742a00666a05066aa096eb88004d5d0a801181b1aba135744a00446a0986a60ce66ae71241035054310006849926135744a00226ae8940044d5d1280089aba25001135744a00226ae8940044d5d1280089aba25001135573ca00226ea8004d5d0a8011919191999ab9a3370ea00290031180f981c1aba135573ca00646666ae68cdc3a801240084603c60846ae84d55cf280211999ab9a3370ea00690011180f18169aba135573ca00a46666ae68cdc3a80224000460426eb8d5d09aab9e50062350473530623357389201035054310006349926499264984d55cea80089baa001357426ae8940088d4100d4c16ccd5ce249035054310005c49926105b13503f35305a3357389201035054350005b4984d55cf280089baa001135573a6ea80044d55cea80089baa0012212330010030022001222222222212333333333300100b00a00900800700600500400300220012212330010030022001122123300100300212001122123300100300212001122123300100300212001212222300400521222230030052122223002005212222300100520011232230023758002640026aa084446666aae7c004940308cd402cc010d5d080118019aba200204323232323333573466e1cd55cea801a4000466600e601a6ae85400cccd54025d728041aba1500233500e75c6ae84d5d1280111a8141a982199ab9c4901035054310004449926135744a00226aae7940044dd5000911091998008020018011000899aa800bae75a224464460046eac004c8004d540f888c8cccd55cf80112804919a80419aa81398031aab9d5002300535573ca00460086ae8800c1004d5d080088910010910911980080200189000919191999ab9a3370e6aae754009200023302d301d35742a00466a00a0386ae84d5d1280111a80f9a981d19ab9c4901035054310003b49926135573ca00226ea8004488c8c8cccd5cd19b875001480008d40c0c014d5d09aab9e500323333573466e1d400920022503023502035303b3357389201035054310003c499264984d55cea80089baa001232323333573466e1cd55cea8012400046600c600e6ae854008dd69aba135744a00446a03a6a607066ae71241035054310003949926135573ca00226ea80048848cc00400c00880048c8cccd5cd19b8735573aa002900011bae357426aae7940088d4064d4c0d0cd5ce24810350543100035499261375400224464646666ae68cdc3a800a40084a00e46666ae68cdc3a8012400446a014600c6ae84d55cf280211999ab9a3370ea00690001280511a80e1a981b99ab9c490103505431000384992649926135573aa00226ea8004484888c00c0104488800844888004480048c8cccd5cd19b8750014800880188cccd5cd19b8750024800080188d4050d4c0bccd5ce2490350543100030499264984d55ce9baa0011220021220012001232323232323333573466e1d4005200c200b23333573466e1d4009200a200d23333573466e1d400d200823300b375c6ae854014dd69aba135744a00a46666ae68cdc3a8022400c46601a6eb8d5d0a8039bae357426ae89401c8cccd5cd19b875005480108cc048c050d5d0a8049bae357426ae8940248cccd5cd19b875006480088c050c054d5d09aab9e500b23333573466e1d401d2000230133016357426aae7940308d4064d4c0d0cd5ce2481035054310003549926499264992649926135573aa00826aae79400c4d55cf280109aab9e500113754002424444444600e01044244444446600c012010424444444600a010244444440082444444400644244444446600401201044244444446600201201040024646464646666ae68cdc3a800a400446660386eb4d5d0a8021bad35742a0066eb4d5d09aba2500323333573466e1d400920002301e3008357426aae7940188d4028d4c094cd5ce2490350543100026499264984d55cea80189aba25001135573ca00226ea80048c8c8cccd5cd19b875001480088c070dd71aba135573ca00646666ae68cdc3a801240004603c6eb8d5d09aab9e500423500735302233573892010350543100023499264984d55cea80089baa0011122232323333573466e1cd55cea80124000466aa012600c6ae854008c014d5d09aba25002235007353022335738921035054310002349926135573ca00226ea8004498448848cc00400c00844800448800848800480048488c00800c8488c00400c8004848c004008800488848ccc00401000c00880048848cc00400c008800448488c00800c4488004480048488c00800c888488ccc00401401000c80048488c00800c8488c00400c80048488c00800c8488c00400c8004480048004448c8c00400488cc00cc008008004cc8ccc888c8c8ccc888ccc888cccccccc88888888cc88ccccc88888cccc8888cc88cc88cc88ccc888cc88cc88ccc888cc88cc88cc88cc88ccc888cc88cc88c8c8c8c8c8c8c8c8cccc8888c8cc88c8c8c8c8c8cc88c8c8c8ccc888cc88cc88ccc888c8c8c88888c8cd4c02401081a094cd4c19ccc01d4008d4c034004800441a454cd4c19ccc88ccd54c0a048004d40b940b48d4d5410800488ccd54c0ac48004d40c540c08d4d5411400488ccd4d540a40048cc1bd2000001223307000200123306f00148000004cc078008004cc88cccd54c0a04800540b14074d4070488ccd54074894cd4c1b4ccc0380180140084cc010d4c1000088880080044004004d4c0e8010888888888802541014008d4c0340048004cc88cccd54c0a04800540b14074d4070488ccd54074894cd4c1b4ccc0380180140084cc010d4c1000088880080044004004d4078488ccd5407c88cc010d4c10000888004004004d4c0f0018888888888802941014008d4c03400480044ccd5cd19b893233200132001333553027120013233503022333502c00300100235029001502b22337000029001000a40006a034244666aa03644a66a60d666016a00c00426600800400220020020109000034034883409a981900091001111a98188011111111111299a9a824199aa981589000a8071299a9836999ab9a3371e0180020de0dc26a0960022a094006420de20da444a66a6a07ca66a6a07c6a606a00244400242a66a6a07e6a60640084444444444a66a6a092666aa605824002a01e46a6aa08c00244a66a60e0666ae68cdc780100703903889a8270018a826801109a8261a9aa823000910008a825119191909999999aba400423333573466e1d40092002233335573ea0084a08e46666aae7cd5d128029299a9a82399191919191999999aba400523333573466e1cd55cea802a400046666aae7d4014941408cccd55cfa8029282891999aab9f500525052233335573e6ae89401894cd4d41494cd4d41494cd4d4148c8c8c8c8ccccccd5d200211999ab9a3370e6aae7540112000233335573ea0084a0b446666aae7d40109416c8cccd55cf9aba25005253353505b302d35742a00e42a66a6a0b8646464646666666ae900108cccd5cd19b875002480008cccd55cfa8021283211999aab9f35744a00a4a66a6a0c86464646464646666666ae900188cccd5cd19b875002480088cccd55cfa8031283711999aab9f50062506f233335573ea00c4a0e046666aae7cd5d128039299a9a83818209aba1500a21533535071304235742a01442a66a6a0e460866ae85402884d41d4ccc2400400c008004541cc541c8541c4941c411010c1081048cccd5cd19b875003480008cccd55cfa8039283791999aab9f35744a0104a66a6a0de60826ae85402484d41c8c23804004541c0941c010c108941b926498941b0941b0941b0941b00fc4d55cea80209aba25001135744a00226aae7940044dd50009aba15006213506735067001150652506503803723333573466e1d400d2002233335573ea00a46a0cca0ca4a0ca0704a0c89324c4a0c44a0c44a0c44a0c406a26aae7540084d55cf280089baa00135742a00e426a0be660b80040022a0ba2a0b84a0b805e05c05a4a0b2931282c1282c1282c1282c01589aba25001135573ca00226ea8004d5d0a804909a82a911998110018010008a82990a99a9a829991919191999999aba400423333573466e1d40092002233335573ea0084a0b646666aae7cd5d128029299a9a82d99191999999aba400223333573466e1cd55cea8012400046666aae7cd55cf280191a83101a9283081a1283024c4a0be4a0be4a0be4a0be06426ea8004d5d0a803109a82f18158008a82e1282e01781711999ab9a3370ea006900011999aab9f50052505c233335573e6ae89401894cd4d4170c0bcd5d0a803909a82f98168008a82e9282e8180179282da4c931282c9282c9282c9282c81609aab9d5002135573ca00226ea8004d5d0a804909a82b18010008a82a0a82990a99a9a82998121aba15008213505630020011505415053250530260250240232504f498941389413894138941380844d5d1280089aba25001135573ca00226ea8004d5d0a803109a82518088008a8241282400d80d11999ab9a3370ea006900011999aab9f500525048233335573e6ae89401894cd4d4120c8c8c8ccccccd5d200191999ab9a3370e6aae75400d2000233335573ea0064a09e46666aae7cd5d128021299a9a82798111aba150052135052301b00115050250500230222504e498941349413494134941340804d55cf280089baa00135742a00e426a09660220022a0924a0920380364a08e9324c4a08a4a08a4a08a4a08a03026aae7540084d55cf280089baa001150401503f21335300600120652333573466e3c010d4c0280048004198194418c4cd4094894cd4d40f00088400c400540ec8488c00800c8488c00400c8004848c004008800488848ccc00401000c00880048488c00800c8488c00400c80048ccccccd5d200092819128191281911a8199bad0022503200523232323333333574800846666ae68cdc3a8012400446666aae7d4010940d88cccd55cf9aba250052533535036300935742a00c426a07260ae0022a06e4a06e01401246666ae68cdc3a801a400046666aae7d4014940dc8cccd55cf9aba250062533535037300a35742a00e426a07460b20022a0704a0700160144a06c9324c4a0684a0684a0684a06800e26aae7540084d55cf280089baa0012333333357480024a0604a0604a0604a06046a0626eb800800c4800480044488c8004c8004d5414c894cd4d409c004400c884cc018008c01000448cd400540914094488cd54c030480048d4d5409c00488cd540a8008cd54c03c480048d4d540a800488cd540b4008ccd4d540380048cc14d2000001223305400200123305300148000004cc00c00800488cd54c02c480048d4d5409800488cd540a4008ccd4d540280048cd54c03c480048d4d540a800488cd540b4008d5404400400488ccd5540200500080048cd54c03c480048d4d540a800488cd540b4008d5403c004004ccd55400c03c008004444888ccd54c01848005408ccd54c02c480048d4d5409800488cd540a4008d54034004ccd54c0184800488d4d5409c008894cd4c144ccd54c04048004c8cd406488ccd4d402c00c88008008004d4d402400488004cd4024894cd4c14c008415440041488d4d540a800488cc028008014018400c4cd409c01000d4090004cd54c02c480048d4d5409800488c8cd540a800cc004014c8004d5414c894cd4d409c0044d5403400c884d4d540b0008894cd4c158cc0300080204cd5404801c0044c01800c00848848cc00400c00848004c8004d5412888448894cd4d40840044008884cc014008ccd54c01c480040140100044484888c00c01044884888cc0080140104484888c004010448004c8004d541148844894cd4d406c00454074884cd4078c010008cd54c01848004010004c8004d5411088448894cd4d406c0044d401800c884ccd4024014c010008ccd54c01c4800401401000448d4d401c0048800448d4d40180048800888ccd5cd19b8f00200104204113350042223003300200120011335005225335303e0021001103f03e12335003223335350060032200200200135350040012200112212330010030021200112212330010030021200112200212200120012212330010030022001222222222212333333333300100b00a00900800700600500400300220012212330010030022001222123330010040030022001112200212212233001004003120011122123300100300211200122123300100300220011212230020031122001120011221233001003002120011221233001003002120011221233001003002120011212223003004112220021122200112001212222300400521222230030052122223002005212222300100520012212330010030022001212222222300700822122222223300600900821222222230050081222222200412222222003221222222233002009008221222222233001009008200121223002003222122333001005004003200121223002003212230010032001223370000400244666ae68cdc400100080200289100109100090008891918008009119801980100100099991119a8012451c45df59537ff070fe9be374ad77630cb4d2dca70ce09c44881e8460da0033500248811cfe0921cfa53b2deef20f185258f8bc6e127ab6fa1084e62f0830ddef005003112200212212233001004003120011'
};