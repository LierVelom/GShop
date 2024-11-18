import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput,FlatList } from "react-native";
import Icon from 'react-native-vector-icons/Feather'
import Icon1 from'react-native-vector-icons/FontAwesome'
const dataType=[
    {
        id:'1',
        img: require('../img/anhSignUp.png'),
        title:'Gọng Kính'
    },
    {
        id:'2',
        img: require('../img/anhSignUp.png'),
        title:'Tròng Kính'
    },
    {
        id:'3',
        img: require('../img/anhSignUp.png'),
        title:'Kính mát'
    },
    {
        id:'4',
        img: require('../img/anhSignUp.png'),
        title:'Nước lau kính'
    },
    {
        id:'5',
        img: require('../img/anhSignUp.png'),
        title:'Hộp đựng kính'
    }
]
const dataProduct=[
    {
        idProduct:"1",
        nameProduct:"Kính mát nam, SS4",
        discription:'Kính dành cho nam, không độ, tránh cận',
        type:"Kính",
        detailType:"Kính nam",
        price:2.7,
        attributes:[
            {
                nameAttribute:'Hình dạng',
                attribute:['tròn to', 'vuông', 'tròn dẹp', 'chữ nhật']
            }
        ],
        img:[require('../img/iphone13_konen.png'),require('../img/samsunga32_1.jpg'),require('../img/samsunga32_2.jpg'),require('../img/samsunga32_3.jpg'),require('../img/samsunga32_4.jpg')],
        quantity:20,
        quantitySold:5,
        sale:50
    },
    {
        idProduct:"2",
        nameProduct:"Kính mát nữ, AA1",
        discription:'Kính phong cách cho nữ, trẻ trung xinh đẹp',
        type:"Kính",
        detailType:"Kính nữ",
        price:8.70,
        attributes:[
            {
                nameAttribute:'Hình dạng',
                attribute:['tròn to', 'vuông', 'tròn dẹp', 'đa giác']
            }
        ],
        img:[require('../img/iphone13_konen.png'),require('../img/iphon13_1.jpg'), require('../img/iphon13_2.jpg'), require('../img/iphon13_3.jpg')],
        quantity:25,
        quantitySold:7,
        sale:30
    },
    {
        idProduct:"3",
        nameProduct:"Gọng kính AA2",
        discription:'Gọng kính sang trọng, dễ thương',
        type:"Gọng Kính",
        detailType:"Gọng kính",
        price:8.1,
        attributes:[
            {
                nameAttribute:'Hình dạng',
                attribute:['tròn to', 'vuông', 'tròn dẹp', 'đa giác']
            },
            {
                nameAttribute:'Kiểu dáng',
                attribute:['không viền', 'nửa khung', 'Avitor', '2 Lớp']
            }
        ],
        img:[require('../img/iphone13_konen.png'),require('../img/samsunga32_1.jpg'),require('../img/samsunga32_2.jpg'),require('../img/samsunga32_3.jpg'),require('../img/samsunga32_4.jpg')],
        quantity:20,
        quantitySold:5,
        sale:50
    },
    {
        idProduct:"4",
        nameProduct:"Gọng kính AA3",
        discription:'Đẹp, dễ thương',
        type:"Gọng Kính",
        detailType:"Gọng Kính",
        price:4.7,
        attributes:[
            {
                nameAttribute:'Hình dạng',
                attribute:['tròn to', 'vuông', 'tròn dẹp', 'đa giác']
            },
            {
                nameAttribute:'Kiểu dáng',
                attribute:['không viền', 'nửa khung', 'Avitor', '2 Lớp']
            }
        ],
        img:[require('../img/iphone13_konen.png'),require('../img/iphon13_1.jpg'), require('../img/iphon13_2.jpg'), require('../img/iphon13_3.jpg')],
        quantity:25,
        quantitySold:7,
        sale:0
    },
    {
        idProduct:"5",
        nameProduct:"Tròng kính SS1",
        discription:'Sang trọng, quý phái',
        type:"Tròng Kính",
        detailType:"Tròng Kính",
        price:6,
        attributes:[
            {
                nameAttribute:'Tính năng',
                attribute:['Chống ánh sáng xanh', 'chống mỏi mắt', 'chống chói', 'chống bẻ']
            },
            {
                nameAttribute:'Chiết suất',
                attribute:['1.59', '1.61', '1.67', '1.74']
            }
        ],
        img:[require('../img/iphone13_konen.png'),require('../img/samsunga32_1.jpg'),require('../img/samsunga32_2.jpg'),require('../img/samsunga32_3.jpg'),require('../img/samsunga32_4.jpg')],
        quantity:20,
        quantitySold:5,
        sale:30
    },
    {
        idProduct:"6",
        nameProduct:"Iphone 13 plus",
        discription:'Dùng hệ điều hành IOS, dùng được mạng 5G, 2 sim',
        type:"Tròng Kính",
        detailType:"Tròng Kính",
        price:2.7,
        attributes:[
            {
                nameAttribute:'Tính năng',
                attribute:['Chống ánh sáng xanh', 'chống mỏi mắt', 'chống chói', 'chống bẻ']
            },
            {
                nameAttribute:'Chiết suất',
                attribute:['1.59', '1.61', '1.67', '1.74']
            }
        ],
        img:[require('../img/iphon13_1.jpg'), require('../img/iphon13_2.jpg'), require('../img/iphon13_3.jpg')],
        quantity:25,
        quantitySold:7,
        sale:0
    },
    {
        idProduct:"7",
        nameProduct:"Nước lau kính sạch bụi",
        discription:'Làm sạch các vết ố',
        type:"Nước lau kính",
        detailType:"Nước lau kính",
        price:12.3,
        attributes:[
            {
                nameAttribute:'size',
                attribute:['500ml', '1l']
            }
        ],
        img:[require('../img/iphone13_konen.png'),require('../img/samsunga32_1.jpg'),require('../img/samsunga32_2.jpg'),require('../img/samsunga32_3.jpg'),require('../img/samsunga32_4.jpg')],
        quantity:20,
        quantitySold:5,
        sale:50
    },
    {
        idProduct:"8",
        nameProduct:"Nước lau bónh kính",
        discription:'Làm bóng bề mặt kính',
        type:"Nước lau kính",
        detailType:"Nước lau kính",
        price:20.1,
        attributes:[
            {
                nameAttribute:'size',
                attribute:['500ml', '1l']
            }
        ],
        img:[require('../img/iphon13_1.jpg'), require('../img/iphon13_2.jpg'), require('../img/iphon13_3.jpg')],
        quantity:25,
        quantitySold:7,
        sale:0
    },
    {
        idProduct:"9",
        nameProduct:"Hộp đựng kính EE1",
        discription:'Hộp đựng kính có kèm khăn lau lót mềm',
        type:"Hộp đựng kính",
        detailType:"Hộp đựng kính",
        price:8.7,
        attributes:[
            {
                nameAttribute:'Màu sắc',
                attribute:['blue', 'green', 'pink']
            },
            {
                nameAttribute:'Chất liệu',
                attribute:['Gỗ', 'Sứ', 'Nhựa']
            }
        ],
        img:[require('../img/iphone13_konen.png'),require('../img/samsunga32_1.jpg'),require('../img/samsunga32_2.jpg'),require('../img/samsunga32_3.jpg'),require('../img/samsunga32_4.jpg')],
        quantity:20,
        quantitySold:5,
        sale:30
    },
    {
        idProduct:"10",
        nameProduct:"Hộp đựng chống xước PP1",
        discription:'Nhỏ gọn, dễ mở và đóng',
        type:"Hộp đựng kính",
        detailType:"Hộp đựng kính",
        price:2.5,
        attributes:[
            {
                nameAttribute:'Màu sắc',
                attribute:['blue', 'green', 'pink']
            },
            {
                nameAttribute:'Chất liệu',
                attribute:['Gỗ', 'Sứ', 'Nhựa']
            }
        ],
        img:[require('../img/iphon13_1.jpg'), require('../img/iphon13_2.jpg'), require('../img/iphon13_3.jpg')],
        quantity:25,
        quantitySold:7,
        sale:0
    }
]
const product50 = dataProduct.filter((e)=>e.sale===50)
const product30 = dataProduct.filter((e)=>e.sale===30)
const HomeProduct =({navigation})=>{
    const renderItem=({item})=>{
        return (
            <View style={{ justifyContent:'center'}}>
                <TouchableOpacity style={{alignItems:'center'}}>
                    <View style={styles.avatarType}>
                            <Image 
                                source={item.img}
                                style={styles.image}
                            />
                    </View>
                    <Text style={styles.titleType}>{item.title}</Text>
                </TouchableOpacity>
            </View>
        );
    }
    const renderItem1=({item})=>{
        return(
            <TouchableOpacity
                style={{backgroundColor:'#F5F2FD', flex:1, paddingHorizontal:5}}
                key={item.idProduct}
            >
                <View style={{flex:1}}>
                    <Image source={item.img[1]} style={{height:130, width:130, resizeMode:'cover'}}/>
                    
                    <Text style={{fontWeight:'bold', marginVertical:15}}>{item.nameProduct}</Text>
                    <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                        <View style={{flexDirection:'row', alignItems:'center'}}>
                            <Icon1 name='star' color={'#F3C63F'}/>
                            <Text>4.5</Text>
                        </View>
                        <Text style={{fontWeight:'800', fontSize:16, color:'#576CD6'}}>$ {item.price}</Text>
                        

                    </View>
                </View>
            </TouchableOpacity>
        );
    }
    return (
        <View style={styles.container}>
            {/** Khu 1*/}
            <View style={styles.khu1}>
                <View style={{flex:1, alignItems:'center', justifyContent:'flex-end', flexDirection:'row', marginTop:40}}>
                <TouchableOpacity onPress={()=>{}}>
                    <Icon name="shopping-cart" size={30} color={'#576CD6'}/>
                </TouchableOpacity>
                    <View style={styles.avatar}>
                        <Image 
                            source={require('../img/anhSignUp.png')}
                            style={styles.image}
                        />
                    </View>
                </View>

            </View>

            {/** Khu 2*/}
            <View style={styles.khu2}>
                {/**Nut tim kiem */}
                <View style={{flex:1, flexDirection:'row',}}>
                    <View style={styles.khufind}>
                        <Icon name='search' size={26} />
                        <TextInput 
                            placeholder="search for product" 
                            placeholderTextColor={'#888'}
                            style={styles.textInputFind}
                        />
                    </View>
                    <TouchableOpacity
                        style={styles.buttonFind}
                    >
                        <Icon name="align-center" size={25}/>
                    </TouchableOpacity>
                </View>
                <View style={styles.type}>
                    <FlatList
                        data={dataType}
                        renderItem={renderItem}
                        keyExtractor={(item) => item.id}
                        horizontal={true}
                        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                    />
                </View>

            </View>

            {/** Khu 3*/}
            <View style={styles.khu3}>
                <View style={styles.sale50}>
                    <View style={{flex:1, justifyContent:'center'}}>
                        <View style={{marginLeft:20, marginRight:40}}>
                            <Text style={{fontSize:30, fontWeight:'900', color:'#576CD6'}}>
                                {product50[0].detailType}
                            </Text>
                            <Text style={{fontSize:20, color:'#bbb'}}>{product50[0].sale} % off</Text>
                            <TouchableOpacity
                                style={styles.sale50_buttonBuy}
                            >
                                <Text style={{color:'#fff', fontSize:18, fontWeight:'700'}}>Buy now</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                    <View style={{flex:1}}>
                        <Image source={product50[0].img[0]} style={styles.image}/>
                        
                    </View>
                </View>

                <View style={styles.sale30}>
                    <View style={{flex:1, borderRadius:10, overflow:'hidden'}}>
                        <TouchableOpacity
                            style={{flex:1}}
                        >
                            <Image source={product30[0].img[1]} style={styles.image}/>

                        </TouchableOpacity>
                        <View style={styles.viewSale30}>
                            <Text style={{color:'#fff', fontSize:15}}>{product30[0].sale}%</Text>
                        </View>
                    </View>

                    <View style={{flex:1, marginLeft:10,  borderRadius:10, overflow:'hidden'}}>
                        <TouchableOpacity
                            style={{flex:1}}
                        >
                            <Image source={product30[1].img[1]} style={styles.image}/>

                        </TouchableOpacity>
                        <View style={styles.viewSale30}>
                            <Text style={{color:'#fff', fontSize:15}}>{product30[1].sale}%</Text>
                        </View>
                    </View>
                </View>

            </View>

            {/** Khu 4*/}
            <View style={styles.khu4}>
                <View style={{flex:1,flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                    <Text style={{fontSize:20, fontWeight:'800', color:'#444'}}>Recommended for you</Text>
                    <TouchableOpacity>
                        <Text style={{fontSize:20,  color:'#888'}}>See all</Text>
                    </TouchableOpacity>
                </View>

                <View style={{flex:5}}>
                    <FlatList
                    data={dataProduct}
                    renderItem={renderItem1}
                    horizontal={true}
                    keyExtractor={(item) => item.id}
                    ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
                    />
                </View>

                <View style={{flex:1}}>

                </View>
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container:{
        flex:1,
        paddingHorizontal:30
    },
    khu1:{
        flex:1,
    },
    avatar:{
        width:50,
        height:50,
        borderRadius:100,
        marginLeft:20,
        overflow: 'hidden'
    },
    image:{
        height:'100%',
        width: '100%',
        resizeMode: 'cover',
    },
    khu2:{
        flex:2
    },
    khufind:{
        flex:1,
        flexDirection:'row',
        alignItems:'center',
        borderRadius:20,
        paddingLeft: 10,
        backgroundColor:'#eee'
    },
    textInputFind:{
        color:'#000',
        fontSize:20,
        marginLeft:10
    },
    buttonFind:{
        padding:10,
        backgroundColor: '#eee',
        marginLeft:10,
        borderRadius:5
    },
    type:{
        flex:3,
        marginTop:10,
        
    },
    avatarType:{
        width:100,
        height:100,
        borderRadius:100,
        overflow: 'hidden',
    },
    titleType:{
        fontSize:18,
        fontWeight:'700',
        marginTop:10
    },
    khu3:{
        flex:3,
    },
    sale50:{
        flex:1,
        flexDirection:'row',
        backgroundColor:'#F5F2FD',
        borderRadius:10
    },
    sale50_buttonBuy:{
        backgroundColor:'#000', 
        padding:10, 
        alignItems:'center', 
        borderRadius:10, 
        marginTop:10
    },
    sale30:{
        marginTop:10,
        flex:1,
        flexDirection:'row',
        borderRadius:10,
        borderRadius:10,
        overflow:'hidden'
    },
    viewSale30:{
        height:30, 
        width:50, 
        position:'absolute', 
        zIndex:1, 
        top:20, 
        backgroundColor:'#E05858',
        borderTopRightRadius:50,
        borderBottomRightRadius:50,
        alignItems:'center',
        justifyContent:'center',

    },
    khu4:{
        flex:3,
    },
})
export default HomeProduct;