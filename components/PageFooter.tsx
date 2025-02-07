import { Flex, Box, Text, Link, Badge } from 'theme-ui';

const PageFooter = (props) => {
  return (
    <Box sx={{ textAlign: 'center', mt: 0, mb: 4, px: 2 }}>
      <Box sx={{ flex: '1 1 auto' }} />
      <Flex sx={{ alignItems: 'center' }}>
        <Box sx={{ flex: '1 1 auto' }} />
        <Link href="https://www.biddytarot.com/tarot-card-meanings/minor-arcana/suit-of-cups/seven-of-cups">
          <Flex sx={{ alignItems: 'center' }}>
            <Text sx={{ fontFamily: 'mono', color: 'gray', mx: 2 }}>
              <Badge variant="tray" sx={{ fontSize: 12, fontWeight: 'bold' }}>
                luthier.computer
              </Badge>
            </Text>
          </Flex>
        </Link>
        <Box sx={{ flex: '1 1 auto' }} />
      </Flex>
      <Box sx={{ flex: '1 1 auto' }} />
    </Box>
  );
};
export default PageFooter;
