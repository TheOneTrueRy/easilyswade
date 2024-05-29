import{B as g,A as s,_ as z,u as M,r as N,w as U,a as V,b as j,d as p,e as I,o as i,c as o,f as r,n as h,t as d,l as E,j as f,F as y,h as m,p as v,q as D,x as F,y as L,P as _}from"./index-btuYbHwl.js";import{p as R}from"./ProfilesService-DdajBkt4.js";import{c as Y}from"./CharactersService-vqDc8zql.js";import q from"./EditProfile-AthjsAl6.js";import T from"./Modal-xPx9f3_B.js";import W from"./CharacterCard-iGYfZY-Y.js";import"./Character-Lws-rLQU.js";class b{constructor(t){this.id=t.id,this.creatorId=t.creatorId,this.creator=t.creator,this.characterId=t.characterId,this.character=t.character,this.partyId=t.partyId,this.party=t.party,this.title=t.title,this.description=t.description,this.imgUrl=t.imgUrl}}class G{async getArt(){const t=await g.get("api/art");s.artArray=t.data.map(a=>new b(a))}async getArtById(t){const a=await g.get("api/art/"+t);s.art=new b(a.data)}async getArtByProfileId(t){const a=await g.get(`api/profiles/${t}/art`);s.artArray=a.data.map(e=>new b(e))}}const H=new G;class x{constructor(t){this.id=t.id,this.creatorId=t.creatorId,this.creator=t.creator,this.characterId=t.characterId,this.character=t.character,this.partyId=t.partyId,this.party=t.party,this.title=t.title,this.description=t.description,this.thumbnail=t.thumbnail,this.tags=t.tags}}class J{async getStories(){const t=await g.get("api/stories");s.stories=t.data.map(a=>new x(a))}async getStoryById(t){const a=await g.get("api/stories/"+t);s.story=new x(a.data)}async getStoriesByProfileId(t){const a=await g.get(`api/profiles/${t}/stories`);s.stories=a.data.map(e=>new x(e))}}const K=new J;class C{constructor(t){this.id=t.id,this.creatorId=t.creatorId,this.creator=t.creator,this.dungeonMasterIds=t.dungeonMasterIds,this.characterIds=t.characterIds,this.name=t.name,this.description=t.description}}class O{async getParties(){const t=await g.get("api/parties");s.parties=t.data.map(a=>new C(a)),s.filteredParties=t.data.map(a=>new C(a))}async getPartyById(t){const a=await g.get("api/parties/"+t);s.party=new C(a.data)}changeFilter(t){t=="all"?s.filteredParties=s.parties:t=="creator"?s.filteredParties=s.parties.filter(a=>a.creatorId==s.account.id):t=="dm"?s.filteredParties=s.parties.filter(a=>a.dungeonMasterIds.includes(s.account.id)):t=="character"&&(s.filteredParties=s.parties.filter(a=>a.characterIds.some(e=>s.characters.filter(w=>w.playerCharacter==!0).includes(e))))}}const Q=new O,X={setup(){const l=M(),t=l.params.profileId,a=N("all");async function e(){try{await R.getProfileById(t)}catch(c){_.error("Experienced an error getting that profile by the provided URL ID.",c.message)}}async function w(){try{await H.getArtByProfileId(t)}catch(c){_.error("Experienced an error getting the Art associated with this profile.",c.message)}}async function S(){try{await K.getStoriesByProfileId(t)}catch(c){_.error("Experienced an error getting the Stories associated with this profile.",c.message)}}async function u(){try{await Y.getCharactersByProfileId(t)}catch(c){_.error("Experienced an error getting the Characters associated with this profile.",c.message)}}async function P(){try{await Q.getParties()}catch(c){_.error("Experienced an error getting parties.",c.message)}}return U(async()=>{l.params.profileId&&(e(),w(),S(),u(),P())}),V(()=>{document.title=`EasilySWADE - ${s.profile.name}'s Profile`}),j(()=>{s.profile=null,s.artArray=[],s.stories=[],s.characters=[],s.parties=[]}),{filter:a,theme:p(()=>s.theme),user:p(()=>s.user),profile:p(()=>s.profile),artArray:p(()=>s.artArray),stories:p(()=>s.stories),playerCharacters:p(()=>s.characters.filter(c=>c.playerCharacter==!0)),nonPlayerCharacters:p(()=>s.characters.filter(c=>c.playerCharacter==!1)),parties:p(()=>s.filteredParties)}},components:{Modal:T,EditProfile:q,CharacterCard:W}},k=l=>(F("data-v-f63b479d"),l=l(),L(),l),Z={class:"container-fluid mb-2"},$={class:"col-12 g-0"},tt={class:"d-flex flex-column flex-sm-row"},et=["src","alt"],rt={class:"d-flex flex-column ps-sm-2"},st={class:"description-overflow pe-2 stylized-scrollbar"},at=k(()=>r("i",{class:"mdi-pencil mdi"},null,-1)),it={key:0,class:"col-3 g-0 d-none d-sm-block mt-2"},ot=k(()=>r("i",{class:"mdi-pencil mdi d-none d-sm-inline"},null,-1)),ct={class:"row mt-4 px-4"},lt={class:"fs-4"},nt={class:"col-12"},dt={class:"row pb-1 row-of-cards mt-2 stylized-scrollbar rtl"},ht={class:"row ltr g-0 justify-content-center justify-content-sm-start"},pt={key:0,class:"fs-5 ps-1"},ft={class:"row mt-5 px-4"},gt={class:"fs-4"},yt={class:"col-12"},mt={class:"row pb-1 row-of-cards mt-2 stylized-scrollbar rtl"},_t={class:"row ltr g-0"},wt={key:0,class:"fs-5 ps-1"},ut={class:"row mt-5 px-4"},vt={class:"fs-4"},Pt={class:"col-12"},It={class:"row pb-1 row-of-cards mt-2 stylized-scrollbar rtl"},bt={class:"row ltr g-0"},xt={key:0,class:"fs-5 ps-1"},Ct={class:"row mt-5 px-4"},kt={class:"fs-4"},St={class:"col-12"},At={class:"row pb-1 row-of-cards mt-2 stylized-scrollbar rtl"},Bt={class:"row ltr g-0"},Et={key:0,class:"fs-5 ps-1"},zt={key:0,class:"row mt-5 px-4"},Mt=k(()=>r("span",{class:"fs-4"}," Your Non Player Characters ",-1)),Nt=[Mt],Ut={class:"col-12"},Vt={class:"row pb-1 row-of-cards mt-2 stylized-scrollbar rtl"},jt={class:"row ltr g-0"},Dt={key:0,class:"fs-5 ps-1"};function Ft(l,t,a,e,w,S){var A,B;const u=I("CharacterCard"),P=I("EditProfile"),c=I("Modal");return i(),o(y,null,[r("div",Z,[r("div",{class:h(["row pt-2 px-4",[e.theme=="light"?"vg-light":"vg-dark"]])},[r("div",$,[r("div",tt,[r("img",{class:"profile-picture shadow",src:(A=e.profile)==null?void 0:A.picture,alt:(B=e.profile)==null?void 0:B.picture},null,8,et),r("div",rt,[r("span",{class:h(["fw-bold fs-2",[e.theme=="light"?"text-dark":"text-light"]])},d(e.profile.name),3),r("span",st,d(e.profile.description),1)]),e.profile.id==e.user.id?(i(),o("button",{key:0,class:h(["btn mt-2 d-sm-none",[e.theme=="light"?"my-btn-dark":"btn-light"]]),"data-bs-toggle":"modal","data-bs-target":"#editProfile",title:"Edit your Profile's information."},[E(" Edit "),at],2)):f("",!0)])]),e.profile.id==e.user.id?(i(),o("div",it,[r("button",{class:h(["btn",[e.theme=="light"?"my-btn-dark":"btn-light"]]),"data-bs-toggle":"modal","data-bs-target":"#editProfile",title:"Edit your Profile's information."},[E(" Edit "),ot],2)])):f("",!0)],2),r("div",ct,[r("div",{class:h(["col-12 g-0 pb-1 ps-2 rounded text-light",[e.theme=="light"?"hg-light":"hg-dark"]])},[r("span",lt,d(e.profile.name)+"'s Player Characters ",1)],2),r("div",nt,[r("div",dt,[r("div",ht,[(i(!0),o(y,null,m(e.playerCharacters,n=>(i(),o("div",{key:n.id,class:"px-2 py-2 w-auto",id:"characterCard"},[v(u,{character:n},null,8,["character"])]))),128))]),e.playerCharacters.length==0?(i(),o("i",pt,d(e.profile.name)+" has no Player Characters... yet. ",1)):f("",!0)])])]),r("div",ft,[r("div",{class:h(["col-12 g-0 pb-1 ps-2 rounded text-light",[e.theme=="light"?"hg-light":"hg-dark"]])},[r("span",gt,d(e.profile.name)+"'s Parties ",1)],2),r("div",yt,[r("div",mt,[r("div",_t,[(i(!0),o(y,null,m(e.parties,n=>(i(),o("div",{key:n.id,class:"w-auto px-3 py-2"}))),128)),e.parties.length==0?(i(),o("i",wt,d(e.profile.name)+" has no parties they're participating in... yet. ",1)):f("",!0)])])])]),r("div",ut,[r("div",{class:h(["col-12 g-0 pb-1 ps-2 rounded text-light",[e.theme=="light"?"hg-light":"hg-dark"]])},[r("span",vt,d(e.profile.name)+"'s Art ",1)],2),r("div",Pt,[r("div",It,[r("div",bt,[(i(!0),o(y,null,m(e.artArray,n=>(i(),o("div",{key:n.id,class:"w-auto px-3 py-2"}))),128)),e.artArray.length==0?(i(),o("i",xt,d(e.profile.name)+" has no art posted... yet. ",1)):f("",!0)])])])]),r("div",Ct,[r("div",{class:h(["col-12 g-0 pb-1 ps-2 rounded text-light",[e.theme=="light"?"hg-light":"hg-dark"]])},[r("span",kt,d(e.profile.name)+"'s Stories ",1)],2),r("div",St,[r("div",At,[r("div",Bt,[(i(!0),o(y,null,m(e.stories,n=>(i(),o("div",{key:n.id,class:"w-auto px-3 py-2"}))),128)),e.stories.length==0?(i(),o("i",Et,d(e.profile.name)+" has no stories posted... yet. ",1)):f("",!0)])])])]),e.profile.id==e.user.id?(i(),o("div",zt,[r("div",{class:h(["col-12 g-0 pb-1 ps-2 rounded text-light",[e.theme=="light"?"hg-light":"hg-dark"]])},Nt,2),r("div",Ut,[r("div",Vt,[r("div",jt,[(i(!0),o(y,null,m(e.nonPlayerCharacters,n=>(i(),o("div",{key:n.id,class:"w-auto px-3 py-2"},[v(u,{character:n},null,8,["character"])]))),128)),e.nonPlayerCharacters.length==0?(i(),o("i",Dt," You have no NPCs made... yet. ")):f("",!0)])])])])):f("",!0)]),v(c,{id:"editProfile"},{default:D(()=>[v(P)]),_:1})],64)}const Ht=z(X,[["render",Ft],["__scopeId","data-v-f63b479d"]]);export{Ht as default};
