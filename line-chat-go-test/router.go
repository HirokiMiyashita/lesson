package chat

import (
	"github.com/gin-gonic/gin"
	melody "gopkg.in/olahol/melody.v1"
	"net/http"
)

func Run() {
	r := gin.Default()
	// サーバーの確立
	m := melody.New()

	r.Static("/static", "./view/static")
	r.LoadHTMLGlob("view/*.html")

	r.GET("/", func(c *gin.Context) {
		c.HTML(http.StatusOK, "index.html", gin.H{})
	})

	r.GET("/room/:name", func(c *gin.Context) {
		c.HTML(http.StatusOK, "room.html", gin.H{
			// room.htmlのchanをNameに代入
			"Name": c.Param("name"),

		})
	})

	r.GET("/room/:name/ws", func(c *gin.Context) {
		m.HandleRequest(c.Writer, c.Request)
	})

	m.HandleMessage(func(s *melody.Session, msg []byte) {
		m.BroadcastFilter(msg, func(q *melody.Session) bool {
			return q.Request.URL.Path == s.Request.URL.Path
		})
	})
	r.Run(":8080")
}
