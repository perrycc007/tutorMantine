import { Image, Accordion, Grid, Container, Title } from "@mantine/core";
import myImage from "../../public/img2.jpg";
import classes from "./FaqWithImage.module.css";

export function FaqWithImage() {
  return (
    <div className={classes.wrapper}>
      <Container size="lg">
        <Grid id="faq-grid" gutter={50}>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Image src={myImage.src} alt="Frequently Asked Questions" />
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 6 }}>
            <Title order={2} ta="left" className={classes.title}>
              常見問題
            </Title>

            <Accordion
              chevronPosition="right"
              defaultValue="reset-password"
              variant="separated"
            >
              <Accordion.Item className={classes.item} value="reset-password">
                <Accordion.Control>
                  我如何在平台上找到適合我的導師？
                </Accordion.Control>
                <Accordion.Panel>
                  您可以通過我們的個性化匹配系統找到合適的導師。只需填寫您的學習需求和偏好，我們的系統便會根據這些信息為您推薦最合適的導師。
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="another-account">
                <Accordion.Control>導師的資質如何驗證？</Accordion.Control>
                <Accordion.Panel>
                  我們對所有導師進行嚴格的資質認證核實。這包括學歷、專業資格證書的審核，以及與發證機構的驗證，以確保他們具備高水準的教學能力和知識。
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="newsletter">
                <Accordion.Control>
                  如果我不滿意配對的導師，我能更換嗎？
                </Accordion.Control>
                <Accordion.Panel>
                  當然可以。我們致力於提供最佳的學習體驗。如果您對配對的導師不滿意，您可以隨時申請更換，我們將為您重新匹配更適合的導師。
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item className={classes.item} value="credit-card">
                <Accordion.Control>
                  使用這個平台的費用是怎樣的？
                </Accordion.Control>
                <Accordion.Panel>
                  學生使用我們平台尋找導師是免費的。導師在平台上提供教學服務時，需要支付一定比例的佣金給平台。這個佣金是根據導師的教學收入計算的，用於維護和改善我們的服務質量。導師的具體佣金比例會在他們加入平台時明確說明。
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Grid.Col>
        </Grid>
      </Container>
    </div>
  );
}
