import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { LibraryBooks } from '@mui/icons-material';
import SearchIcon from '@mui/icons-material/Search';
import { FC, useState, MouseEvent } from 'react';
import { alpha, styled } from '@mui/material/styles';
import InputBase from '@mui/material/InputBase';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { debounce } from 'lodash';
import { SvgIcon } from '@mui/material';

const pages = [
    {
        name: '论坛',
        path: 'https://community.memfiredb.com'
    }
];

const Search = styled('div')(({theme}) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    border: '1px solid black',
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: 'auto',
    },
}));

const SearchIconWrapper = styled('div')(({theme}) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({theme}) => ({
    color: 'inherit',
    width: '100%',
    '& .MuiInputBase-input': {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
}));

const Navbar: FC = () => {

    const router = useRouter();

    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };


    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };


    // 防抖
    const doSearch = debounce(async (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const {value} = event.target;
        const query = router.query;
        if (value === '') {
            delete query.search;
        } else {
            query.search = value;
        }
        await router.push({query, pathname: '/'});
    }, 200);

    return (
        <AppBar position='sticky' color='transparent'
                sx={{backgroundColor: 'white', borderBottom: '1px solid rgba(0, 0, 0, .12)', boxShadow: 'none'}}>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>

                    {/* icon与应用名称，在小屏幕下隐藏 */}
                    <SvgIcon sx={{mr: 1}} viewBox="0 0 490 490">
                        <g>
                            <g>
                                <g>
                                    <path d='M415,0H75c-5.523,0-10,4.478-10,10v420c0,5.523,4.477,10,10,10h10v40c0,5.523,4.477,10,10,10h40c5.523,0,10-4.477,10-10
				v-40h200v40c0,5.523,4.477,10,10,10h40c5.523,0,10-4.477,10-10v-40h10c5.523,0,10-4.477,10-10V10C425,4.478,420.523,0,415,0z
				 M125,470h-20v-30h20V470z M235,420H85V315h150V420z M385,470h-20v-30h20V470z M405,420H255V315h150V420z M405,295H85v-60h320
				V295z M405,215H85v-10h320V215z M405,185H85v-60h320V185z M405,105H85V95h320V105z M405,75H85V20h320V75z' />
                                    <rect x='270' y='355' width='30' height='20' />
                                    <rect x='190' y='355' width='30' height='20' />
                                </g>
                            </g>
                        </g>
                    </SvgIcon>
                    <Typography
                        variant='h6'
                        noWrap
                        component='a'
                        href='/'
                        sx={{
                            mr: 2,
                            display: {xs: 'none', md: 'flex'},
                            fontWeight: 300,
                            letterSpacing: '.1rem',
                            color: 'black',
                            textDecoration: 'none',
                        }}
                    >
                        E-BookShelf
                    </Typography>

                    {/* 页面导航，在小屏幕模式下显示下拉按钮 */}
                    <Box sx={{display: {xs: 'flex', md: 'none'}}}>
                        <IconButton
                            size='large'
                            aria-label='account of current user'
                            aria-controls='menu-appbar'
                            aria-haspopup='true'
                            onClick={handleOpenNavMenu}
                            color='inherit'
                        >
                            <MenuIcon />
                        </IconButton>
                        <Menu
                            id='menu-appbar'
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: {xs: 'block', md: 'none'},
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem key={page.name} href={page.path}>
                                    <Link href={page.path} onClick={handleCloseNavMenu}>
                                        <a>{page.name}</a>
                                    </Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>

                    {/* 页面导航，不是小屏幕则正常横向显示 */}
                    <Box sx={{display: {xs: 'none', md: 'flex'}}}>
                        {pages.map((page) => (
                            <Button key={page.name} sx={{color: 'black'}}>
                                <Link href={page.path} key={page.name}>
                                    <a>{page.name}</a>
                                </Link>
                            </Button>
                        ))}
                    </Box>

                    {/* 搜索框 */}
                    <Search sx={{flexGrow: 1}}>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder='书籍名称关键字'
                            inputProps={{'aria-label': 'search'}}
                            onChange={(e) => doSearch(e)}
                        />
                    </Search>

                </Toolbar>
            </Container>
        </AppBar>
    );
};
export default Navbar;
